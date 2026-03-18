import { getStory } from '@/lib/data';

export default function StoryPage() {
  const story = getStory();

  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <div className="space-y-4 mb-16 text-center">
        <h1 className="text-4xl font-bold">Professional Journey</h1>
        <p className="text-xl text-muted-foreground">The evolution of an enterprise infrastructure engineer.</p>
      </div>

      <div className="relative border-l border-primary/30 ml-4 md:ml-0 space-y-12 pb-8">
        {story.chapters.map((chapter, i) => (
          <div key={i} className="relative pl-8 md:pl-12 group">
            <div className="absolute w-4 h-4 bg-primary rounded-full left-[-8.5px] top-1.5 ring-4 ring-background group-hover:scale-125 transition-transform" />
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-bold text-primary tracking-wider uppercase">{chapter.period}</span>
              <h3 className="text-2xl font-bold">{chapter.title}</h3>
              <p className="text-muted-foreground leading-relaxed mt-2 bg-muted/30 p-4 rounded-lg border border-border/50">
                {chapter.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
