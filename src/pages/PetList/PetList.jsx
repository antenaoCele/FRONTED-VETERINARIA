import React, { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import { PetContext } from '../../App.jsx';
import PetCard from '../../components/PetCard.jsx';
import { useApi } from '../../hooks/useApi.js';
import { useNotifications } from '../../hooks/useNotifications.js';

const PetList = () => {
    const { pets, setPets } = useContext(PetContext);
    const { del } = useApi();
    const { success, error } = useNotifications();

    const handleDelete = async (id) => {
        const result = await del(`/mascotas/${id}`);
        if (result) {
            setPets(pets.filter(pet => pet._id !== id));
            success('Mascota eliminada');
        } else {
            error('Error al eliminar');
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Listado de Mascotas</Typography>
            <Grid container spacing={2}>
                {pets.map(pet => (
                    <Grid key={pet._id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <PetCard pet={pet} onDelete={handleDelete} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default PetList;