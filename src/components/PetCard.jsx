import React, { memo } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const PetCard = memo(({ pet, onDelete }) => (
    <Card sx={{ mb: 2 }}>
        <CardContent>
            <Typography variant="h5">{pet.nombre}</Typography>
            <Typography>Especie: {pet.especie}</Typography>
            <Typography>Raza: {pet.raza}</Typography>
            <Typography>Edad: {pet.edad}</Typography>
            <Grid container spacing={1} sx={{ mt: 1 }}>
                <Grid key={`view-${pet._id}`}>
                    <Button component={Link} to={`/mascotas/${pet._id}`} variant="outlined">Ver Detalle</Button>
                </Grid>
                <Grid key={`edit-${pet._id}`}>
                    <Button component={Link} to={`/mascotas/edit/${pet._id}`} variant="outlined">Editar</Button>
                </Grid>
                <Grid key={`delete-${pet._id}`}>
                    <Button onClick={() => onDelete(pet._id)} variant="outlined" color="error">Eliminar</Button>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
));

export default PetCard;