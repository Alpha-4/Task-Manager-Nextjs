import GlassPane from "@/components/GlassPane";
import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";

export default function DashboardRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head />
            <body className="h-screen w-screen rainbow-mesh p-6">
                <GlassPane
                    className="w-full h-full flex items-center">
                    <Sidebar />
                    {children}
                </GlassPane>
            </body>
        </html>
    )
}