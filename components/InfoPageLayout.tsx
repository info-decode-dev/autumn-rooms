interface InfoPageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function InfoPageLayout({ title, description, children }: InfoPageLayoutProps) {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[var(--background)]">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4 text-[var(--foreground)]">
          {title}
        </h1>
        {description && (
          <p className="text-[var(--foreground)]/60 text-lg mb-10">{description}</p>
        )}
        <div className="prose prose-neutral dark:prose-invert max-w-none text-[var(--foreground)]/80 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}
