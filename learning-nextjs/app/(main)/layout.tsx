export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <div>
                    <h1>Main Layout</h1>
                    {children}
                </div>
            </body>
        </html>
    )
}