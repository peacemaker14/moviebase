import { ReactNode } from 'react';

import Navbar from '../components/Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-gray-50 min-h-screen p-6 w-screen">
      <Navbar />

      <main className="container mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
