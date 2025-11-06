import { useApi } from '../hooks/useApi';

export const useClientService = () => {
    const { get, post, put, del } = useApi();

    const fetchClients = async () => await get('/clientes');
    const fetchClient = async (id) => await get(`/clientes/${id}`);
    const createClient = async (client) => await post('/clientes', client);
    const updateClient = async (id, client) => await put(`/clientes/${id}`, client);
    const deleteClient = async (id) => await del(`/clientes/${id}`);

    return { fetchClients, fetchClient, createClient, updateClient, deleteClient };
};