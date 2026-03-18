import { getIdentity } from '@/lib/data';
import { Instagram, Linkedin, Mail, Phone, Send, Download } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const identity = getIdentity();

  return (
    <div className="container max-w-3xl mx-auto py-16 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Let's Connect</h1>
        <p className="text-xl text-muted-foreground">Open to opportunities, technical discussions, and infrastructure challenges.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        <Link href={identity.contact.linkedin} target="_blank" className="flex flex-col items-center justify-center p-8 bg-card border border-border rounded-2xl hover:bg-accent/50 hover:border-primary/50 transition-all group shadow-sm">
          <Linkedin className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-lg">LinkedIn</h3>
          <p className="text-sm text-muted-foreground">Professional Network</p>
        </Link>
        <Link href={identity.contact.email.startsWith('mailto:') ? identity.contact.email : `mailto:${identity.contact.email}`} className="flex flex-col items-center justify-center p-8 bg-card border border-border rounded-2xl hover:bg-accent/50 hover:border-primary/50 transition-all group shadow-sm">
          <Mail className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-lg">Email</h3>
          <p className="text-sm text-muted-foreground">{identity.contact.email}</p>
        </Link>
        <Link href={`https://wa.me/${identity.contact.whatsapp}`} target="_blank" className="flex flex-col items-center justify-center p-8 bg-card border border-border rounded-2xl hover:bg-accent/50 hover:border-primary/50 transition-all group shadow-sm">
          <Phone className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-lg">WhatsApp</h3>
          <p className="text-sm text-muted-foreground">{identity.contact.phone}</p>
        </Link>
        <Link href={identity.contact.instagram} target="_blank" className="flex flex-col items-center justify-center p-8 bg-card border border-border rounded-2xl hover:bg-accent/50 hover:border-primary/50 transition-all group shadow-sm">
          <Instagram className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="font-bold text-lg">Instagram</h3>
          <p className="text-sm text-muted-foreground">Personal Profile</p>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 border-t border-border pt-12">
        <Link href="/resume" className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold transition-transform hover:scale-105 shadow-md w-full sm:w-auto">
          <Download className="w-5 h-5" /> Download Resume
        </Link>
        <Link href="/ai-assistant" className="flex items-center justify-center gap-2 bg-muted text-foreground border border-border px-8 py-4 rounded-xl font-bold hover:bg-muted/80 transition-colors shadow-sm w-full sm:w-auto">
          <Send className="w-5 h-5" /> Chat with AI
        </Link>
      </div>
    </div>
  );
}
