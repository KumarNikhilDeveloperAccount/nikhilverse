import Link from "next/link";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border mt-auto">
      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <p className="text-sm font-medium">Kumar Nikhil</p>
          <p className="text-xs text-muted-foreground">ITSM & Infrastructure Services</p>
        </div>
        
        <div className="flex gap-4">
          <Link href="https://www.linkedin.com/in/kumar-nikhil-1000a9192" target="_blank" className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link href="https://www.instagram.com/nikhil_.kashyap/" target="_blank" className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <Instagram className="w-5 h-5" />
          </Link>
          <Link href="mailto:nkashyapnikhilnk@gmail.com" className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <Mail className="w-5 h-5" />
          </Link>
          <Link href="https://wa.me/919315600875" target="_blank" className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <Phone className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
