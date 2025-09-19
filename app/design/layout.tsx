import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PaperLab - Design",
  description: "Engineer your stickers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <>{children}</>
          
  );
}
