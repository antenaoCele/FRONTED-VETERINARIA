import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography, MenuItem, CircularProgress, Alert } from '@mui/material';
import { useApi } from '../../hooks/useApi.js';
import { useNotifications } from '../../hooks/useNotifications.js';
import { ClientContext } from '../../App.jsx';

const PetForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ nombre: '', especie: '', raza: '', edad: '', cliente_id: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { get, post, put } = useApi();
    const { success, error: notifyError } = useNotifications();
    const { clients } = useContext(ClientContext);

    useEffect(() => {
        if (id) {
            const fetchPet = async () => {
                try {
                    console.log('Intentando cargar mascota para editar con ID:', id);
                    const data = await get(`/mascotas/${id}`);
                    console.log('Respuesta del backend para editar:', data);
                    if (data && data.nombre) {
                        setForm(data);
                    } else {
                        console.error('Mascota no encontrada para editar');
                        setError('Mascota no encontrada');
                    }
                } catch (err) {
                    console.error('Error al cargar para editar:', err);
                    setError('Error al cargar la mascota');
                }
            };
            fetchPet();
        }
    }, [id, get]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log('Enviando datos para guardar:', form);
            const result = id ? await put(`/mascotas/${id}`, form) : await post('/mascotas', form);
            console.log('Respuesta del backend al guardar:', result);
            if (result) {
                success(id ? 'Mascota actualizada' : 'Mascota creada');
                navigate('/');
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
            <Typography variant="h4">{id ? 'Editar Mascota' : 'Nueva Mascota'}</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid size={12}><TextField fullWidth label="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required /></Grid>
                    <Grid size={12}>
                        <TextField select fullWidth label="Especie" value={form.especie} onChange={(e) => setForm({ ...form, especie: e.target.value })} required>
                            <MenuItem value="Perro">Perro</MenuItem>
                            <MenuItem value="Gato">Gato</MenuItem>
                            <MenuItem value="Ave">Ave</MenuItem>
                            <MenuItem value="Roedor">Roedor</MenuItem>
                            <MenuItem value="Reptil">Reptil</MenuItem>
                            <MenuItem value="Otro">Otro</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={12}><TextField fullWidth label="Raza" value={form.raza} onChange={(e) => setForm({ ...form, raza: e.target.value })} /></Grid>
                    <Grid size={12}><TextField fullWidth label="Edad" type="number" value={form.edad} onChange={(e) => setForm({ ...form, edad: e.target.value })} /></Grid>
                    <Grid size={12}>
                        <TextField select fullWidth label="Cliente" value={form.cliente_id} onChange={(e) => setForm({ ...form, cliente_id: e.target.value })} required>
                            {clients.map(client => <MenuItem key={client._id} value={client._id}>{client.nombre}</MenuItem>)}
                        </TextField>
                    </Grid>
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

export default PetForm;