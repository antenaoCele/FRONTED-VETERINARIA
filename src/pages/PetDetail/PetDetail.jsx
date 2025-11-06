import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Card, CardContent, CircularProgress, Alert, Button } from '@mui/material';
import { useApi } from '../../hooks/useApi.js';

const PetDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { get } = useApi();

    useEffect(() => {
        const fetchPet = async () => {
            try {
                console.log('Intentando cargar mascota con ID:', id);
                const data = await get(`/mascotas/${id}`);
                console.log('Respuesta del backend para mascota:', data);
                if (data && data.nombre) {
                    setPet(data);
                } else {
                    console.error('Mascota no encontrada o datos inválidos');
                    setError('Mascota no encontrada');
                }
            } catch (err) {
                console.error('Error al cargar mascota:', err);
                setError('Error al cargar la mascota');
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchPet();
    }, [id, get]);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!pet) return <Typography>No se encontró la mascota</Typography>;

    return (
        <div>
            <Button variant="outlined" onClick={() => navigate('/')} sx={{ mb: 2 }}>Volver a Inicio</Button>
            <Card>
                <CardContent>
                    <Typography variant="h4">{pet.nombre}</Typography>
                    <Typography>Especie: {pet.especie}</Typography>
                    <Typography>Raza: {pet.raza}</Typography>
                    <Typography>Edad: {pet.edad}</Typography>
                    <Typography>Dueño: {pet.cliente_id ? pet.cliente_id.nombre : 'No asignado'}</Typography>
                    {pet.cliente_id && (
                        <>
                            <Typography>Email del dueño: {pet.cliente_id.email}</Typography>
                            <Typography>Teléfono del dueño: {pet.cliente_id.telefono}</Typography>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default PetDetail;