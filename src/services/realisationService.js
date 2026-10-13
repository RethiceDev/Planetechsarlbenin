
import { api } from './api';

export async function listerRealisations() {
  const { data } = await api.get('/realisations');

  return data?.data ?? data;
}
