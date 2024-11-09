import AppLayout from "@/components/AppLayout/AppLayout";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AppLayout>
            {children}
        </AppLayout>
    );
}
