import Link from "next/link";
import SignOut from "./sign_out";

export const FeatureNavigation = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="text-sm md:text-xl lg:text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
          >
            Service Report
          </Link>
          <nav className="ml-4 md:ml-6">
            <ul className="flex items-center gap-2 md:gap-4 lg:gap-8">
              <li className="hidden sm:block">
                <Link
                  href="/service-report-parser"
                  className="text-gray-600 hover:text-gray-900 px-2 md:px-3 py-2 text-xs md:text-sm lg:text-base font-medium transition-all hover:scale-105"
                >
                  Parser
                </Link>
              </li>
              <li className="hidden sm:block">
                <Link
                  href="/service-report-workstation"
                  className="text-gray-600 hover:text-gray-900 px-2 md:px-3 py-2 text-xs md:text-sm lg:text-base font-medium transition-all hover:scale-105"
                >
                  Workstation Report
                </Link>
              </li>
              <li className="sm:hidden">
                <Link
                  href="/service-report-parser"
                  className="text-gray-600 hover:text-gray-900 px-2 py-2 text-sm font-medium"
                >
                  Parser
                </Link>
              </li>
              <li className="sm:hidden">
                <Link
                  href="/service-report-workstation"
                  className="text-gray-600 hover:text-gray-900 px-2 py-2 text-sm font-medium"
                >
                  Workstation
                </Link>
              </li>
              <li>
                <SignOut />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
