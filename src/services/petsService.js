import { useApi } from '../hooks/useApi';

export const usePetService = () => {
    const { get, post, put, del } = useApi();

    const fetchPets = async () => await get('/mascotas');
    const fetchPet = async (id) => await get(`/mascotas/${id}`);
    const createPet = async (pet) => await post('/mascotas', pet);
    const updatePet = async (id, pet) => await put(`/mascotas/${id}`, pet);
    const deletePet = async (id) => await del(`/mascotas/${id}`);

    return { fetchPets, fetchPet, createPet, updatePet, deletePet };
};