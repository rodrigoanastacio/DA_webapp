export function Summary({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </section>
  )
}
