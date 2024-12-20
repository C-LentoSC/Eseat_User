import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-bgMyColor7 pt-24 pb-8 md:pb-12">
      <div className="my-container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Links Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase">Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Login
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Send Ticket
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Transfer Ticket
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase">Contact</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                FAQ
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                T&C
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Company Info */}
          <div className="space-y-4">
            <img src="/logos/sltb.svg" alt="SLTB eSeat" className="h-10" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium">Hands Global Holdings (Pvt) Ltd.</p>
              <p>
                No. 129/5, Nawala Road, Narahenpita,
                <br />
                Sri Lanka.
              </p>
              <p>Hotline: 1315 | info@eseat.lk</p>
            </div>
          </div>

          {/* SLTB Info */}
          <div className="space-y-4">
            <img
              src="/logos/sltb_logo2.svg"
              alt="Sri Lanka Transport Board"
              className="h-10"
            />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium">Sri Lanka Transport Board</p>
              <p>No. 200, Kirula Road, Colombo 5</p>
              <p>+94 (0) 11 2589683 | info@sltb.lk</p>
            </div>
          </div>
        </div>

        {/* Social Links & App Downloads */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
          <div className="flex space-x-4">
            <Link
              href="#"
              target="_blank"
              className="text-muted-foreground hover:text-primary"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="#"
              target="_blank"
              className="text-muted-foreground hover:text-primary"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="#"
              target="_blank"
              className="text-muted-foreground hover:text-primary"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="#" target="_blank" className="block">
              <img
                src="/assets/applestore.png"
                alt="Download on the App Store"
                className="h-10"
              />
            </Link>
            <Link href="#" target="_blank" className="block">
              <img
                src="/assets/playstore.png"
                alt="Get it on Google Play"
                className="h-10"
              />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
            <p>© 2024 eseat.lk. All rights reserved</p>
            <div className="flex items-center space-x-4">
              <Link href="#" className="hover:text-primary">
                Terms of use
              </Link>
              <Separator orientation="vertical" className="h-4" />
              <Link href="#" className="hover:text-primary">
                Privacy
              </Link>
              <Separator orientation="vertical" className="h-4" />
              <Link href="#" className="hover:text-primary">
                Refund policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
