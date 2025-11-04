export default function TryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen mt-10 px-8 py-16  transition-colors">
      {children}
    </div>
  );
}
