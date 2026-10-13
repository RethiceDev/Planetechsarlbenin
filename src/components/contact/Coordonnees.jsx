import { ENTREPRISE, telHref } from '@/data/entreprise';

/** Bloc de coordonnées affiché à côté du formulaire. */
export default function Coordonnees() {
  return (
    <aside className="rounded-2xl bg-forest-700 p-8 text-forest-100">
      <h2 className="font-display text-xl font-semibold text-white">Nous joindre directement</h2>
      <p className="mt-3 text-sm leading-relaxed">
        Pour une urgence ou une panne, l'appel reste le plus rapide.
      </p>

      <dl className="mt-8 space-y-6 text-sm">
        <div>
          <dt className="font-semibold text-white">Adresse</dt>
          <dd className="mt-1">{ENTREPRISE.adresse}</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Téléphones</dt>
          <dd className="mt-1 flex flex-col gap-1">
            {ENTREPRISE.telephones.map((tel) => (
              <a key={tel} href={telHref(tel)} className="hover:text-white">{tel}</a>
            ))}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Email</dt>
          <dd className="mt-1">
            <a href={`mailto:${ENTREPRISE.email}`} className="break-all hover:text-white">
              {ENTREPRISE.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Horaires</dt>
          <dd className="mt-1">{ENTREPRISE.horaires}</dd>
        </div>
      </dl>
    </aside>
  );
}
