import React, { memo } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const ClientCard = memo(({ client, onDelete }) => (
    <Card sx={{ mb: 2 }}>
        <CardContent>
            <Typography variant="h5">{client.nombre}</Typography>
            <Typography>Email: {client.email}</Typography>
            <Typography>Teléfono: {client.telefono}</Typography>
            <Grid container spacing={1} sx={{ mt: 1 }}>
                <Grid key={`view-${client._id}`}>
                    <Button component={Link} to={`/clientes/${client._id}`} variant="outlined">Ver Detalle</Button>
                </Grid>
                <Grid key={`edit-${client._id}`}>
                    <Button component={Link} to={`/clientes/edit/${client._id}`} variant="outlined">Editar</Button>
                </Grid>
                <Grid key={`delete-${client._id}`}>
                    <Button onClick={() => onDelete(client._id)} variant="outlined" color="error">Eliminar</Button>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
));

export default ClientCard;