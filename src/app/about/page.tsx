import { getIdentity, getBio } from '@/lib/data';

export default function AboutPage() {
  const identity = getIdentity();
  const bio = getBio();

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">About {identity.preferredName}</h1>
        <p className="text-xl text-muted-foreground">{bio.detailedSummary}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Identity & Facts</h2>
          <div className="bg-muted/50 p-6 rounded-xl space-y-4 border border-border">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium">{identity.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Preferred Name</p>
              <p className="font-medium">{identity.preferredName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pronouns</p>
              <p className="font-medium">{identity.pronouns}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{identity.location}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Work Philosophy</h2>
          <div className="bg-primary/10 p-6 rounded-xl border border-primary/20">
            <p className="italic text-foreground/90">"{bio.philosophy}"</p>
          </div>
          
          <h2 className="text-2xl font-bold pt-4">For Recruiters</h2>
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <p className="text-sm leading-relaxed">{bio.recruiterSummary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
