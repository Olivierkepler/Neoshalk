import DashboardSidebar from "@/app/components/DashboardSidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900">
    <div className="flex ">
        {/* Sidebar */}
        <DashboardSidebar />
  
    </div>

      {/* Page content */}
      <main className="flex-1  overflow-y-auto">
        {children}
      </main>
    
    </div>
  );
}
