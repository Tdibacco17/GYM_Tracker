import AppAdminLayout from "@/components/AppAdminLayout/AppAdminLayout";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AppAdminLayout>
            {children}
        </AppAdminLayout>
    );
}
