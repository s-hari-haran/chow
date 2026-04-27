const stats = [
  { value: "10k+", label: "Daily check-ins" },
  { value: "500+", label: "Sites monitored" },
  { value: "99.8%", label: "Scan accuracy" },
  { value: "<1s", label: "Mark attendance" },
];

export function Stats() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
