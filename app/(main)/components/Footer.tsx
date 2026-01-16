import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <div className="mx-auto w-full max-w-[1600px] px-4 py-12 sm:px-5 lg:px-6 xl:px-8 2xl:px-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            MyApp
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            A modern platform for sharing and discovering great content.
                        </p>
                        <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
                            &copy; {new Date().getFullYear()} MyApp. All rights reserved.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Legal</h3>
                        <nav className="mt-4 space-y-2">
                            <Link 
                                href="/privacy"
                                className="block text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            >
                                Privacy
                            </Link>
                            <Link 
                                href="/terms"
                                className="block text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            >
                                Terms
                            </Link>
                        </nav>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Contact</h3>
                        <nav className="mt-4 space-y-2">
                            <Link 
                                href="/contact"
                                className="block text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            >
                                Contact
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
}

