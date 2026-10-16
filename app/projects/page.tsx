import { projects } from "../data/projects";

export default function Projects() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Projects</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <a
            key={p.title}
            href={p.link}
            className="rounded-xl border p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="mb-2 text-xl font-semibold">{p.title}</h2>
            <p className="mb-4 text-sm opacity-80">{p.description}</p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full border px-3 py-1 text-xs">
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}