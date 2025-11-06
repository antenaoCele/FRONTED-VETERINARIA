import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import { useApi } from '../../hooks/useApi.js';
import { useNotifications } from '../../hooks/useNotifications.js';

const ClientForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ nombre: '', email: '', telefono: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { get, post, put } = useApi();
    const { success, error: notifyError } = useNotifications();

    useEffect(() => {
        if (id) {
            const fetchClient = async () => {
                try {
                    console.log('Cargando cliente para editar con ID:', id);
                    const data = await get(`/clientes/${id}`);
                    console.log('Datos para editar:', data);
                    if (data) setForm(data);
                    else setError('Cliente no encontrado');
                } catch (err) {
                    console.error('Error al cargar para editar:', err);
                    setError('Error al cargar el cliente');
                }
            };
            fetchClient();
        }
    }, [id, get]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = id ? await put(`/clientes/${id}`, form) : await post('/clientes', form);
            if (result) {
                success(id ? 'Cliente actualizado' : 'Cliente creado');
                navigate('/clientes');
            } else {
                notifyError('Error al guardar');
            }
        } catch (err) {
            console.error('Error al guardar:', err);
            notifyError('Error al guardar');
        } finally {
            setLoading(false);
        }
    };

    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <div>
            <Typography variant="h4">{id ? 'Editar Cliente' : 'Nuevo Cliente'}</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid size={12}><TextField fullWidth label="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required /></Grid>
                    <Grid size={12}><TextField fullWidth label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></Grid>
                    <Grid size={12}><TextField fullWidth label="Teléfono" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} /></Grid>
                    <Grid size={12}>
                        <Button type="submit" variant="contained" disabled={loading}>
                            {loading ? <CircularProgress size={20} /> : 'Guardar'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default ClientForm;