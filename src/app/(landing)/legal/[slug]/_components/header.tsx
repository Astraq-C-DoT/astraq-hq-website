import { formatDate } from "date-fns";

type LegalHeaderProps = {
  title: string;
  createdAt?: string | null;
};

export function LegalHeader({ title, createdAt }: LegalHeaderProps) {
  return (
    <header className="flex flex-col gap-4 rounded-lg bg-secondary p-6 sm:p-8 md:p-10">
      <h1 className="font-bold text-4xl font-serif text-secondary-foreground md:text-5xl">
        {title}
      </h1>
      {createdAt && (
        <time dateTime={createdAt} className="text-muted-foreground text-sm">
          Published: {formatDate(createdAt, "MMM d, yyyy")}
        </time>
      )}
    </header>
  );
}
