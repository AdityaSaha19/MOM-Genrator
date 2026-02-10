import "./globals.css";

export const metadata = {
  title: "MOM AI",
  description: "AI Powered Google Meet MOM Generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
