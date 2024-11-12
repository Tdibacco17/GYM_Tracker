export default function CommonLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-svh h-svh w-full flex flex-col items-center justify-center px-4">
            {children}
        </div>
    );
}
