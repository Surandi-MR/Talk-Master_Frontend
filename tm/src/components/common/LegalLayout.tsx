import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useState } from 'react';

interface LegalLayoutProps {
  children: React.ReactNode;
}

export function LegalLayout({ children }: LegalLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link to="/about" className="hover:text-gray-300">About</Link>
      <Link to="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
      <Link to="/terms" className="hover:text-gray-300">Terms of Use</Link>
    </>
  );

  return (
    <div className="min-h-screen bg-[#0A192F] text-white">
      <div className="max-w-[1400px] mx-auto">
        <nav className="flex items-center justify-between p-6">
          <Link to="/">
            <Logo size="lg" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLinks />
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-gray-200">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-[#0A192F] border-l border-white/10">
              <div className="flex justify-end mb-6">
                <SheetClose className="text-gray-200 hover:text-white">
                  <X className="h-6 w-6" />
                </SheetClose>
              </div>
              <div className="flex flex-col gap-6 text-gray-200">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </nav>
        {children}
      </div>
    </div>
  );
}