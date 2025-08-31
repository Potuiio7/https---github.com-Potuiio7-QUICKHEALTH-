import { Facebook, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import Logo from "../icons/logo";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Digital Queue & Appointment Management for Hospitals.
            </p>
          </div>
          <div>
            <h4 className="font-headline text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/#how-it-works" className="text-sm hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link href="/#features" className="text-sm hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/dashboard" className="text-sm hover:text-primary transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={24} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={24} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} QuickHealth. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
