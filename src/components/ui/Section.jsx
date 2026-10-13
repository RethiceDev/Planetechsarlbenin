import { cn } from '@/utils/cn';

/** Conteneur de section avec espacement vertical homogène sur tout le site. */
export default function Section({ id, className, fond = 'blanc', children }) {
  const fonds = {
    blanc: 'bg-white',
    clair: 'bg-forest-50',
    sombre: 'bg-forest-700 text-white',
  };

  return (
    <section id={id} className={cn('py-16 md:py-24', fonds[fond], className)}>
      <div className="container">{children}</div>
    </section>
  );
}
