import { create } from 'zustand';

export type LeadStatus = 'new' | 'contacted' | 'converted';
export type ClientStatus = 'חדש' | 'בתהליך' | 'אושר' | 'נסגר';

export interface Lead {
  _id?: string;
  id?: string; // fallback
  name: string;
  phone: string;
  email?: string;
  message?: string;
  createdAt: string;
  status: LeadStatus;
}

export interface Client {
  _id?: string;
  id?: string;
  name: string;
  phone: string;
  email?: string;
  income: number;
  equity: number;
  propertyValue: number;
  status: ClientStatus;
  notes: string;
  createdAt: string;
}

interface AdminState {
  leads: Lead[];
  clients: Client[];
  loading: boolean;
  
  // API Fetchers
  fetchData: () => Promise<void>;

  // Clients
  addClient: (client: Omit<Client, '_id' | 'id' | 'createdAt'>) => Promise<void>;
  updateClient: (id: string, updates: Partial<Client>) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;

  // Leads
  updateLeadStatus: (id: string, status: LeadStatus) => Promise<void>;
  convertLeadToClient: (leadId: string, clientData: Partial<Client>) => Promise<void>;
}

export const useAdminStore = create<AdminState>()(
  (set, get) => ({
    leads: [],
    clients: [],
    loading: false,

    fetchData: async () => {
      set({ loading: true });
      try {
        const [clientsRes, leadsRes] = await Promise.all([
          fetch('/api/clients'),
          fetch('/api/leads')
        ]);
        
        if (clientsRes.ok && leadsRes.ok) {
          const clientsData = await clientsRes.json();
          const leadsData = await leadsRes.json();
          set({ clients: clientsData, leads: leadsData, loading: false });
        } else {
          set({ loading: false });
        }
      } catch (e) {
        console.error("DB Not Connected / Fetch Error", e);
        set({ loading: false });
      }
    },

    addClient: async (clientData) => {
      try {
        const res = await fetch('/api/clients', {
          method: 'POST',
          body: JSON.stringify(clientData)
        });
        if (res.ok) {
          const newClient = await res.json();
          set((state) => ({ clients: [newClient, ...state.clients] }));
        }
      } catch (e) { console.error(e); }
    },

    updateClient: async (id, updates) => {
      try {
        const res = await fetch(`/api/clients/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updates)
        });
        if (res.ok) {
          const updated = await res.json();
          set((state) => ({
            clients: state.clients.map(c => (c._id === id || c.id === id) ? updated : c)
          }));
        }
      } catch (e) { console.error(e); }
    },

    deleteClient: async (id) => {
      try {
        const res = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
        if (res.ok) {
          set((state) => ({
            clients: state.clients.filter(c => c._id !== id && c.id !== id)
          }));
        }
      } catch (e) { console.error(e); }
    },

    updateLeadStatus: async (id, status) => {
      try {
        const res = await fetch(`/api/leads/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ status })
        });
        if (res.ok) {
          const updated = await res.json();
          set((state) => ({
            leads: state.leads.map(l => (l._id === id || l.id === id) ? updated : l)
          }));
        }
      } catch (e) { console.error(e); }
    },

    convertLeadToClient: async (leadId, clientData) => {
      try {
        const state = get();
        const lead = state.leads.find(l => l._id === leadId || l.id === leadId);
        if (!lead) return;

        // 1. Create the new client via API
        const createClientRes = await fetch('/api/clients', {
          method: 'POST',
          body: JSON.stringify({
            name: lead.name,
            phone: lead.phone,
            email: lead.email || '',
            ...clientData,
            status: 'חדש'
          })
        });

        // 2. Mark lead as converted via API
        const updateLeadRes = await fetch(`/api/leads/${leadId}`, {
          method: 'PUT',
          body: JSON.stringify({ status: 'converted' })
        });

        if (createClientRes.ok && updateLeadRes.ok) {
          const newClient = await createClientRes.json();
          const updatedLead = await updateLeadRes.json();

          set((state) => ({
            leads: state.leads.map(l => (l._id === leadId || l.id === leadId) ? updatedLead : l),
            clients: [newClient, ...state.clients]
          }));
        }
      } catch (e) { console.error(e); }
    }
  })
);
