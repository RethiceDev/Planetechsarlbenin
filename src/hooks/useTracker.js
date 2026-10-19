import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const API = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api')
  .replace(/\/api\/?$/, '') + '/api';

function getSessionSource() {
  try {
    let referrer = sessionStorage.getItem('trk_ref');
    let utm = sessionStorage.getItem('trk_utm');

    if (referrer === null) {
      const r = document.referrer || '';
      let own = false;
      try { own = !!r && new URL(r).host === window.location.host; } catch { /* ignore */ }
      referrer = own ? '' : r;

      const params = new URLSearchParams(window.location.search);
      utm = params.get('utm_source') || '';
      if (!utm && params.get('fbclid')) utm = 'facebook';
      if (!utm && params.get('igshid')) utm = 'instagram';

      sessionStorage.setItem('trk_ref', referrer);
      sessionStorage.setItem('trk_utm', utm);
    }
    return { referrer, utm_source: utm || '' };
  } catch {
    return { referrer: '', utm_source: '' };
  }
}

export default function useTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith('/admin')) return; // on ne compte pas l'administration

    fetch(`${API}/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ page: pathname, ...getSessionSource() }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);
}