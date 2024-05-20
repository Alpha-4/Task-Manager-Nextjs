import GlassPane from "@/components/GlassPane";
import "@/styles/globals.css";

export default function AuthRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head />
            <body className="h-full w-full rainbow-mesh p-6">
                <GlassPane
                    className=" flex items-center justify-center m-8">
                    {children}
                </GlassPane>
            </body>
        </html>
    )
}