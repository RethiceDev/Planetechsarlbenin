/** Concatène des classes Tailwind conditionnelles sans dépendance externe. */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
