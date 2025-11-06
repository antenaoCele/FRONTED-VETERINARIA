import React, { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import { ClientContext } from '../../App.jsx';
import ClientCard from '../../components/ClientCard.jsx';
import { useApi } from '../../hooks/useApi.js';
import { useNotifications } from '../../hooks/useNotifications.js';

const ClientList = () => {
    const { clients, setClients } = useContext(ClientContext);
    const { del } = useApi();
    const { success, error } = useNotifications();

    const handleDelete = async (id) => {
        const result = await del(`/clientes/${id}`);
        if (result) {
            setClients(clients.filter(client => client._id !== id));
            success('Cliente eliminado');
        } else {
            error('Error al eliminar');
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Listado de Clientes</Typography>
            <Grid container spacing={2}>
                {clients.map(client => (
                    <Grid key={client._id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <ClientCard client={client} onDelete={handleDelete} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ClientList;