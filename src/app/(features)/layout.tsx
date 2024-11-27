import Link from "next/link";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-semibold text-gray-900">
              Service Report
            </Link>
            <nav className="ml-6">
              <ul className="flex items-center space-x-8">
                <li>
                  <Link
                    href="/service-report-parser"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Parser Report
                  </Link>
                </li>
                <li>
                  <Link
                    href="/service-report-workstation"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Workstation Report
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Service Report. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
