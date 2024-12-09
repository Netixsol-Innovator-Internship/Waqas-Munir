export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <p>Child Layout</p>
      {children}
    </main>
  );
}
