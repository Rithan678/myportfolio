import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const redirectUri = process.env.LINKEDIN_REDIRECT_URI;
  
  if (!clientId || !redirectUri) {
    console.error("Missing LinkedIn configuration");
    return new NextResponse("LinkedIn configuration missing. Please check your environment variables.", { 
      status: 500 
    });
  }

  // LinkedIn OAuth scopes for profile data
  const scope = encodeURIComponent("r_liteprofile r_emailaddress");
  const state = `linkedin-auth-${Date.now()}`;
  
  // Build LinkedIn OAuth URL
  const linkedinAuthUrl = new URL("https://www.linkedin.com/oauth/v2/authorization");
  linkedinAuthUrl.searchParams.set("response_type", "code");
  linkedinAuthUrl.searchParams.set("client_id", clientId);
  linkedinAuthUrl.searchParams.set("redirect_uri", redirectUri);
  linkedinAuthUrl.searchParams.set("scope", scope);
  linkedinAuthUrl.searchParams.set("state", state);

  console.log("Redirecting to LinkedIn OAuth:", linkedinAuthUrl.toString());
  
  return NextResponse.redirect(linkedinAuthUrl.toString());
}