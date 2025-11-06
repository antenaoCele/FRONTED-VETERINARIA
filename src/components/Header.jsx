import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Veterinaria App
            </Typography>
            <Button color="inherit" component={Link} to="/">Mascotas</Button>
            <Button color="inherit" component={Link} to="/clientes">Clientes</Button>
            <Button color="inherit" component={Link} to="/mascotas/new">Nueva Mascota</Button>
            <Button color="inherit" component={Link} to="/clientes/new">Nuevo Cliente</Button>
        </Toolbar>
    </AppBar>
);

export default Header;