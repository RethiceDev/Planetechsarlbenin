import { useState } from 'react';
import { Users, Building2 } from 'lucide-react';
import EquipeManager from './EquipeManager';
import PartenairesManager from './PartenairesManager';
import { cn } from '@/utils/cn';

/** Deux gestions proches regroupées sous un jeu d'onglets. */
const ONGLETS = [
  { valeur: 'equipe', libelle: 'Équipe', icone: Users },
  { valeur: 'partenaires', libelle: 'Partenaires', icone: Building2 },
];

export default function EquipeEtPartenaires() {
  const [onglet, setOnglet] = useState('equipe');

  return (
    <div className="space-y-5">
      <div className="flex gap-2" role="tablist" aria-label="Équipe et partenaires">
        {ONGLETS.map(({ valeur, libelle, icone: Icone }) => (
          <button
            key={valeur}
            type="button"
            role="tab"
            aria-selected={onglet === valeur}
            onClick={() => setOnglet(valeur)}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors',
              onglet === valeur
                ? 'border-signal bg-signal text-white'
                : 'border-forest-100 bg-white text-slate-muted hover:border-forest-200 hover:text-forest-700'
            )}
          >
            <Icone size={16} aria-hidden="true" />
            {libelle}
          </button>
        ))}
      </div>

      {onglet === 'equipe' ? <EquipeManager /> : <PartenairesManager />}
    </div>
  );
}
