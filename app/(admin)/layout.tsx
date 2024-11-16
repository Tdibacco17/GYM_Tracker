import Navigation from "@/components/Navigation/Navigation";
import NavigationLayout from "@/components/NavigationLayout/NavigationLayout";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="h-full w-full flex flex-col relative">
            <div className="pt-4 pb-[7.5rem] w-full h-full">
                {children}
            </div>
            <NavigationLayout>
                <Navigation />
            </NavigationLayout>
        </main>
    );
}
