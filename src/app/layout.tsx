import "./globals.css";

export const metadata = {
  title: "My-Asrat App",
  description: "My Asrat Tracking Next.js app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
