import axios from 'axios';

export const equipeService = {
  async getAll() {
    const response = await axios.get('/api/equipes');
    return Array.isArray(response.data) ? response.data : (response.data.data || []);
  },
  async lister() {
    return this.getAll();
  },
  async create(formData) {
    const response = await axios.post('/api/equipes', formData);
    return response.data;
  },
  async delete(id) {
    const response = await axios.delete(`/api/equipes/${id}`);
    return response.data;
  }
};

export const changerStatutDevis = async (id, statut) => {
  const response = await axios.patch(`/api/devis/${id}/statut`, { statut });
  return response.data;
};

export const expertiseService = {
  async getAll() {
    const response = await axios.get('/api/expertises');
    return Array.isArray(response.data) ? response.data : (response.data.data || []);
  },
  async lister() {
    return this.getAll();
  },
  async create(formData) {
    const response = await axios.post('/api/expertises', formData);
    return response.data;
  },
  async delete(id) {
    const response = await axios.delete(`/api/expertises/${id}`);
    return response.data;
  }
};

export const devisService = {
  async lister() {
    const response = await axios.get('/api/listes_devis');
    return Array.isArray(response.data) ? response.data : (response.data.data || []);
  },
  async modifier(id, data) {
    const response = await axios.patch(`/api/devis/${id}/statut`, data);
    return response.data;
  },
  async supprimer(id) {
    const response = await axios.delete(`/api/devis/${id}`);
    return response.data;
  }
};

export const produitsService = {
  async getAll() {
    const response = await axios.get('/api/produits');
    return Array.isArray(response.data) ? response.data : (response.data.data || []);
  },
  async lister() {
    return this.getAll();
  },
  async create(formData) {
    const response = await axios.post('/api/produits', formData);
    return response.data;
  },
  async delete(id) {
    const response = await axios.delete(`/api/produits/${id}`);
    return response.data;
  }
};

export const partenairesService = {
  async getAll() {
    const response = await axios.get('/api/partenaires');
    return Array.isArray(response.data) ? response.data : (response.data.data || []);
  },
  async lister() {
    return this.getAll();
  },
  async create(formData) {
    const response = await axios.post('/api/partenaires', formData);
    return response.data;
  },
  async delete(id) {
    const response = await axios.delete(`/api/partenaires/${id}`);
    return response.data;
  }
};

export const chargerStatistiques = async () => {
  const response = await axios.get('/api/statistiques');
  return response.data;
};