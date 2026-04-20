import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Narkkipeli – Heklu Core",
  description: "Yhdistä juomat ja selviä Lasoliin asti. Suomalainen 2048-peli heklu corella.",
  keywords: ["narkkipeli", "heklu core", "2048", "peli", "suomi", "selainpeli", "puzzle"],
  authors: [{ name: "heklu core" }],
  creator: "heklu core",
  metadataBase: new URL("https://ksyk.vercel.app"),
  openGraph: {
    title: "Narkkipeli – Heklu Core",
    description: "Yhdistä juomat ja selviä Lasoliin asti.",
    url: "https://ksyk.vercel.app",
    siteName: "Narkkipeli",
    locale: "fi_FI",
    type: "website",
    images: [{ url: "/favicon.png" }],
  },
  twitter: {
    card: "summary",
    title: "Narkkipeli – Heklu Core",
    description: "Yhdistä juomat ja selviä Lasoliin asti.",
    images: ["/favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fi">
      <meta name="google-site-verification" content="UOmPVtY3xqVfyiXlFM1QjMNmYyvWO89d3-W-5OI7ajY" />
      <body style={{ margin: 0, padding: 0, backgroundColor: "#0f0e0c" }}>
        {children}
      </body>
    </html>
  );
}