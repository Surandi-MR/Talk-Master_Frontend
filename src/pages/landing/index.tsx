import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, Instagram, Facebook, Twitter, Menu, X } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { useState } from 'react';

export function Landing() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link to="/about" className="hover:text-gray-300">
        About
      </Link>
      <Link to="/privacy" className="hover:text-gray-300">
        Privacy Policy
      </Link>
      <Link to="/terms" className="hover:text-gray-300">
        Terms of Use
      </Link>
      <Link to="/login">
        <Button className="bg-[#DC2626] hover:bg-[#B91C1C]">SIGN IN</Button>
      </Link>
    </>
  );

  return (
    <div className="min-h-screen w-full bg-[#0A192F] text-white">
      <div className="max-w-[1400px] mx-auto">
        <nav className="flex justify-between p-6">
          <Logo size="fit" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            <NavLinks />
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-gray-200">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-[#0A192F] border-l border-white/10"
            >
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

        <main className="px-6 py-12 md:py-20">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="flex-1">
              <h1 className="text-3xl md:text-6xl font-bold leading-tight">
                UNLOCK YOUR
                <br />
                POTENTIAL.
                <br />
                SPEAK WITH
                <br />
                CONFIDENCE.
              </h1>
            </div>

            <div className="flex-1 space-y-8  flex flex-col justify-between">
              <p className="text-gray-200 text-base md:text-lg">
                We are here to help you spoken English through interactive
                sessions, real-time feedback, and expert guidance. Whether you
                are preparing for a presentation, interview or just want to
                enhance your fluency, Talk Master has got you covered.
              </p>
              <Link to="/register">
                <Button className="bg-[#DC2626] hover:bg-[#B91C1C] text-base md:text-lg px-6 md:px-8 mt-10">
                  GET STARTED →
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>

      <footer className="fixed bottom-0 right-0 p-4 md:p-6 flex gap-4">
        <a href="#" className="hover:text-gray-300">
          <Instagram className="h-5 w-5" />
        </a>
        <a href="#" className="hover:text-gray-300">
          <Facebook className="h-5 w-5" />
        </a>
        <a href="#" className="hover:text-gray-300">
          <Twitter className="h-5 w-5" />
        </a>
        <a href="#" className="hover:text-gray-300">
          <Mail className="h-5 w-5" />
        </a>
      </footer>
    </div>
  );
}
