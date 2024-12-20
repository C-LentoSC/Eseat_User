import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-bgMyColor7">
      <div className="my-container md:py-12 border-2">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Links Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase">Links</h3>
            <nav className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Login
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Send Ticket
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Transfer Ticket
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Contact Us
              </a>
            </nav>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase">Contact</h3>
            <nav className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                FAQ
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                T&C
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Privacy Policy
              </a>
            </nav>
          </div>

          {/* Company Info */}
          <div className="space-y-4">
            <img
              src="/placeholder.svg?height=40&width=150"
              alt="SLTB eSeat"
              className="h-10"
            />
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
              src="/placeholder.svg?height=40&width=40"
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
            <a href="#" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="block">
              <img
                src="/placeholder.svg?height=40&width=120"
                alt="Download on the App Store"
                className="h-10"
              />
            </a>
            <a href="#" className="block">
              <img
                src="/placeholder.svg?height=40&width=120"
                alt="Get it on Google Play"
                className="h-10"
              />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
            <p>© 2024 eseat.lk. All rights reserved</p>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-primary">
                Terms of use
              </a>
              <Separator orientation="vertical" className="h-4" />
              <a href="#" className="hover:text-primary">
                Privacy
              </a>
              <Separator orientation="vertical" className="h-4" />
              <a href="#" className="hover:text-primary">
                Refund policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
