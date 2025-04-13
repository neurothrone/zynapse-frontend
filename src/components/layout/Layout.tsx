import { ReactNode } from 'react';
import Navbar from './Navbar';
import CartDrawer from '../cart/CartDrawer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-slate-800 border-t border-slate-700 py-6 px-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Zynapse. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            The ultimate cyberpunk game store experience
          </p>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
};

export default Layout;
