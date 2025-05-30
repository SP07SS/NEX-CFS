
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, BriefcaseBusiness, ChevronDown } from 'lucide-react';
import LanguageSelector from '../language-selector';

const navItems = [
  { href: '/', label: 'Home', hasDropdown: false },
  { href: '/about', label: 'About Us', hasDropdown: false },
  { href: '/services', label: 'Services', hasDropdown: false },
  { href: '/blog', label: 'Blog', hasDropdown: false },
  { href: '/faq', label: 'FAQ', hasDropdown: false },
  { href: '/contact', label: 'Contact Us', hasDropdown: false },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BriefcaseBusiness className="h-7 w-7 text-foreground" />
          <span className="text-xl font-bold text-foreground">NEX CFS</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-grow items-center justify-end space-x-1 lg:space-x-2 text-sm font-medium">
          {navItems.map((item) => ( 
            <Link key={item.label} href={item.href} className="px-3 py-2 flex items-center gap-1 transition-colors hover:text-primary text-foreground/80 hover:text-foreground">
              {item.label}
              {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
            </Link>
          ))}
          <div className="px-2">
            <LanguageSelector />
          </div>
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" asChild className="text-foreground/80 hover:text-foreground hover:bg-transparent px-3">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/register">Register</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <nav className="grid gap-2 text-lg font-medium mt-8">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <BriefcaseBusiness className="h-6 w-6 text-foreground" />
                  <span className="text-foreground">NEX CFS</span>
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary py-2"
                  >
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                  </Link>
                ))}
                <div className="mt-2">
                  <LanguageSelector isMobile={true} />
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                  <Button variant="outline" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register">Register</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
