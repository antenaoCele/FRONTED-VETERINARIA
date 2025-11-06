import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Card, CardContent, CircularProgress, Alert, Button, List, ListItem, ListItemText } from '@mui/material';
import { useApi } from '../../hooks/useApi.js';

const ClientDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState(null);
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { get } = useApi();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Intentando cargar cliente con ID:', id);
                const clientData = await get(`/clientes/${id}`);
                console.log('Respuesta del backend para cliente:', clientData);
                if (clientData && clientData.nombre) {
                    setClient(clientData);
                    // Cargar mascotas del cliente
                    const petsData = await get(`/mascotas?cliente_id=${id}`);
                    console.log('Mascotas del cliente:', petsData);
                    setPets(petsData || []);
                } else {
                    console.error('Cliente no encontrado o datos inválidos');
                    setError('Cliente no encontrado');
                }
            } catch (err) {
                console.error('Error al cargar cliente o mascotas:', err);
                setError('Error al cargar el cliente');
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchData();
    }, [id, get]);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!client) return <Typography>No se encontró el cliente</Typography>;

    return (
        <div>
            <Button variant="outlined" onClick={() => navigate('/clientes')} sx={{ mb: 2 }}>Volver a Clientes</Button>
            <Card sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="h4">{client.nombre}</Typography>
                    <Typography>Email: {client.email}</Typography>
                    <Typography>Teléfono: {client.telefono}</Typography>
                </CardContent>
            </Card>
            <Typography variant="h5" sx={{ mb: 1 }}>Mascotas de este cliente:</Typography>
            {pets.length > 0 ? (
                <List>
                    {pets.map(pet => (
                        <ListItem key={pet._id}>
                            <ListItemText primary={`${pet.nombre} (${pet.especie})`} secondary={`Raza: ${pet.raza}, Edad: ${pet.edad}`} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography>No tiene mascotas registradas.</Typography>
            )}
        </div>
    );
};

export default ClientDetail;