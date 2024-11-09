export default function CommonLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-[100vh] h-[100vh] max-h-[100vh] w-full flex flex-col items-center justify-center p-8">
            {children}
        </div>
    );
}
