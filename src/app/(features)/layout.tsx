import { FeatureNavigation } from "../ui/shared/feature_navigation";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <FeatureNavigation />
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
