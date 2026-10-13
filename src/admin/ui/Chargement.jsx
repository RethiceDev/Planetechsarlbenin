/** Squelette de chargement, évite le saut de mise en page. */
export default function Chargement({ lignes = 3 }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-live="polite">
      <span className="sr-only">Chargement en cours</span>
      {Array.from({ length: lignes }).map((_, i) => (
        <div key={i} className="h-12 animate-pulse rounded-lg bg-forest-50" />
      ))}
    </div>
  );
}
