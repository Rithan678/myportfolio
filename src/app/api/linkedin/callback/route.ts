import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  
  if (error) {
    console.error("LinkedIn OAuth error:", error);
    return NextResponse.redirect(`${request.nextUrl.origin}/?error=linkedin_auth_failed`);
  }
  
  if (!code) {
    console.error("No authorization code received from LinkedIn");
    return NextResponse.redirect(`${request.nextUrl.origin}/?error=no_code`);
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI || "",
        client_id: process.env.LINKEDIN_CLIENT_ID || "",
        client_secret: process.env.LINKEDIN_CLIENT_SECRET || "",
      }),
    });

    const tokenData = await tokenResponse.json();
    
    if (!tokenData.access_token) {
      console.error("Failed to get access token:", tokenData);
      throw new Error("Failed to exchange code for access token");
    }

    const accessToken = tokenData.access_token;

    // Fetch LinkedIn profile data
    const [profileResponse, emailResponse] = await Promise.all([
      fetch("https://api.linkedin.com/v2/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      fetch("https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    ]);

    const profileData = await profileResponse.json();
    const emailData = await emailResponse.json();

    // Extract useful information
    const linkedinProfile = {
      id: profileData.id,
      firstName: profileData.firstName?.localized?.en_US || profileData.localizedFirstName,
      lastName: profileData.lastName?.localized?.en_US || profileData.localizedLastName,
      headline: profileData.headline?.localized?.en_US || profileData.localizedHeadline,
      profilePicture: profileData.profilePicture,
      email: emailData.elements?.[0]?.["handle~"]?.emailAddress,
      vanityName: profileData.vanityName,
    };

    console.log("LinkedIn profile imported successfully:", linkedinProfile);

    // For now, redirect back to home with success message
    // In a real app, you'd save this to a database
    const profileData64 = Buffer.from(JSON.stringify(linkedinProfile)).toString('base64');
    return NextResponse.redirect(`${request.nextUrl.origin}/?linkedin_import=success&data=${profileData64}`);

  } catch (error) {
    console.error("Error processing LinkedIn callback:", error);
    return NextResponse.redirect(`${request.nextUrl.origin}/?error=linkedin_processing_failed`);
  }
}