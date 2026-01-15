export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12 dark:from-gray-900 dark:to-gray-950 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                {children}
            </div>
        </div>
    );
}