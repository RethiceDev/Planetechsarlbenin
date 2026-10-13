import { useRef } from 'react';
import { ImagePlus, Trash2 } from 'lucide-react';
import { useApercuImage } from '@/admin/hooks/useApercuImage';
import { cn } from '@/utils/cn';

/**
 * Sélecteur d'image avec aperçu.
 * `valeur` est un File (nouvelle sélection) ; `urlExistante` une image déjà en base.
 */
export default function ChampImage({ id, label = 'Image', valeur, urlExistante, onChange, erreur }) {
  const inputRef = useRef(null);
  const apercu = useApercuImage(valeur) ?? urlExistante ?? null;

  return (
    <div className="space-y-1.5">
      <span className="block text-sm font-medium text-forest-700">{label}</span>

      <div
        className={cn(
          'flex items-center gap-4 rounded-lg border border-dashed p-3',
          erreur ? 'border-red-300' : 'border-forest-200'
        )}
      >
        <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-lg bg-forest-50">
          {apercu ? (
            <img src={apercu} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImagePlus size={20} className="text-forest-300" aria-hidden="true" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={(e) => onChange(e.target.files?.[0] ?? null)}
            className="block w-full text-xs text-slate-muted file:mr-3 file:rounded-md file:border-0 file:bg-forest-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-forest-700 hover:file:bg-forest-100"
          />
          <p className="mt-1.5 text-xs text-slate-muted">JPG, PNG, WebP ou SVG · 2 Mo maximum</p>
        </div>

        {apercu && (
          <button
            type="button"
            onClick={() => {
              onChange(null);
              if (inputRef.current) inputRef.current.value = '';
            }}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-muted hover:bg-red-50 hover:text-red-600"
          >
            <span className="sr-only">Retirer l'image</span>
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {erreur && <p role="alert" className="text-xs font-medium text-red-600">{erreur}</p>}
    </div>
  );
}
