import type { Metadata } from "next";
import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Rithan D'Souza - BCA Student | IQAC Editorial Board Intern",
  description: "Portfolio of Rithan D'Souza - BCA student at St Aloysius College with experience as Student Intern at IQAC Editorial Board. Passionate about technology, creative design, and software development.",
  keywords: ["Rithan D'Souza", "BCA Student", "IQAC Editorial Board", "St Aloysius College", "Content Management", "Graphic Design", "Canva", "Student Portfolio", "Editorial Intern"],
  authors: [{ name: "Rithan D'Souza" }],
  openGraph: {
    title: "Rithan D'Souza - BCA Student Portfolio",
    description: "BCA student at St Aloysius College with hands-on experience in content management and editorial work. Open to graphic designer and editor roles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
