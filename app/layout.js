import "./globals.css";

export const metadata = {
  title: "Daily Chess Puzzle",
  description: "A new chess puzzle from Chess.com every day.",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
