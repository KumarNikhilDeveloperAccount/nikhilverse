import { getResume, getIdentity } from '@/lib/data';
import { Download, FileText, Mail, Phone, MapPin } from 'lucide-react';

export default function ResumePage() {
  const resume = getResume();
  const identity = getIdentity();

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 shadow-sm pb-6 border-b border-border">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Interactive Resume</h1>
          <p className="text-muted-foreground">Structured view of my professional background.</p>
        </div>
        <a href="#" className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium hover:opacity-90 transition-opacity">
          <Download className="w-4 h-4" />
          Download PDF
        </a>
      </div>

      <div className="bg-card border border-border rounded-xl p-8 md:p-12 shadow-sm space-y-10">
        {/* Header */}
        <div className="text-center md:text-left space-y-2 border-b border-border pb-8">
          <h2 className="text-3xl font-extrabold">{identity.fullName}</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Mail className="w-4 h-4"/> {identity.contact.email}</span>
            <span className="flex items-center gap-1"><Phone className="w-4 h-4"/> {identity.contact.phone}</span>
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {identity.location}</span>
          </div>
        </div>

        {/* Summary */}
        <div>
          <h3 className="text-xl font-bold uppercase tracking-wider mb-4 text-primary flex items-center gap-2">
            <FileText className="w-5 h-5"/> Summary
          </h3>
          <p className="text-foreground/80 leading-relaxed">{resume.summary}</p>
        </div>

        {/* Experience */}
        <div>
          <h3 className="text-xl font-bold uppercase tracking-wider mb-6 text-primary flex items-center gap-2">
            <FileText className="w-5 h-5"/> Experience
          </h3>
          <div className="space-y-8">
            {resume.experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg">{exp.role}</h4>
                  <span className="text-sm font-medium bg-muted px-2 py-1 rounded">{exp.period}</span>
                </div>
                <p className="font-medium text-muted-foreground mb-4">{exp.company}</p>
                <ul className="space-y-2 list-disc list-inside text-foreground/80">
                  {exp.bullets.map((b, i) => <li key={i} className="leading-snug">{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Education & Certs */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-wider mb-4 text-primary flex items-center gap-2">
              <FileText className="w-5 h-5"/> Education
            </h3>
            <div className="space-y-4">
              {resume.education.map((edu, idx) => (
                <div key={idx}>
                  <h4 className="font-bold">{edu.degree}</h4>
                  <p className="text-muted-foreground text-sm">{edu.institution} • {edu.period}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold uppercase tracking-wider mb-4 text-primary flex items-center gap-2">
              <FileText className="w-5 h-5"/> Certifications
            </h3>
            <ul className="space-y-2 text-foreground/80 text-sm list-disc list-inside">
              {resume.certifications.map((cert) => <li key={cert}>{cert}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
