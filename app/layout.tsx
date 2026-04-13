import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Narkkipeli – Heklu Core",
  description: "Yhdistä juomat ja selviä Lasoliin asti. Suomalainen 2048-peli heklu corella.",
  keywords: ["narkkipeli", "heklu core", "2048", "peli", "suomi", "selainpeli", "puzzle"],
  authors: [{ name: "heklu core" }],
  creator: "heklu core",
  metadataBase: new URL("https://yourdomain.fi"),
  openGraph: {
    title: "Narkkipeli – Heklu Core",
    description: "Yhdistä juomat ja selviä Lasoliin asti.",
    url: "https://yourdomain.fi",
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
      <body style={{ margin: 0, padding: 0, backgroundColor: "#0f0e0c" }}>
        {children}
      </body>
    </html>
  );
}