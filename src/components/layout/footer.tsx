import React from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Linkedin, Instagram, BriefcaseBusiness, LogIn, Apple, Smartphone } from 'lucide-react'; // Added Apple, Smartphone

const NewsletterSubscribeForm = () => (
  <form className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
    <Input type="email" placeholder="Enter your email" className="flex-grow" aria-label="Email for newsletter"/>
    <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Subscribe</Button>
  </form>
);


export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-12 px-4">
      <div className="w-full px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
                <BriefcaseBusiness className="h-7 w-7 text-primary" />
                <span className="text-xl font-bold text-primary">NEX CFS</span>
            </Link>
            <p className="text-sm">Finance. Fund. Grow. All in One Place.</p>
            <div className="mt-3">
              <Link href="/login" className="text-sm text-primary hover:underline flex items-center gap-1">
                <LogIn className="h-4 w-4" />
                Company Login
              </Link>
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-foreground mb-3">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/services" className="hover:text-primary">Services</Link></li>
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
              <li>
                <Link href="#" className="hover:text-primary flex items-center gap-1.5">
                  <Apple className="h-4 w-4" /> Download for iOS
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary flex items-center gap-1.5">
                  <Smartphone className="h-4 w-4" /> Download for Android
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-foreground mb-3">Legal</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms-and-conditions" className="hover:text-primary">Terms &amp; Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
              <li><Link href="/legal-qa" className="hover:text-primary">Legal Q&amp;A</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-foreground mb-3">Newsletter</h5>
            <p className="text-sm mb-2">Stay updated with our latest news and offers.</p>
            <NewsletterSubscribeForm />
            <div className="flex space-x-4 mt-4">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary"><Facebook size={20} /></Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary"><Twitter size={20} /></Link>
              <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary"><Linkedin size={20} /></Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram size={20} /></Link>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} NEX CFS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
