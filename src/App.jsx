import React, { createContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import PetList from './pages/PetList/PetList.jsx';
import PetDetail from './pages/PetDetail/PetDetail.jsx';
import PetForm from './pages/PetForm/PetForm.jsx';
import ClientList from './pages/ClientList/ClientList.jsx';
import ClientDetail from './pages/ClientDetail/ClientDetail.jsx';
import ClientForm from './pages/ClientForm/ClientForm.jsx';
import Header from './components/Header.jsx';
import { useApi } from './hooks/useApi.js';

// Contextos globales para mascotas y clientes
export const PetContext = createContext();
export const ClientContext = createContext();

function App() {
  const [pets, setPets] = useState([]);
  const [clients, setClients] = useState([]);
  const { get } = useApi();

  // Cargar datos al inicio
  useEffect(() => {
    const fetchData = async () => {
      const petsData = await get('/mascotas');
      const clientsData = await get('/clientes');
      setPets(petsData || []);
      setClients(clientsData || []);
    };
    fetchData();
  }, [get]);

  return (
    <PetContext.Provider value={{ pets, setPets }}>
      <ClientContext.Provider value={{ clients, setClients }}>
        <CssBaseline />
        <Header />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<PetList />} />
            <Route path="/mascotas/:id" element={<PetDetail />} />
            <Route path="/mascotas/new" element={<PetForm />} />
            <Route path="/mascotas/edit/:id" element={<PetForm />} />
            <Route path="/clientes" element={<ClientList />} />
            <Route path="/clientes/:id" element={<ClientDetail />} />
            <Route path="/clientes/new" element={<ClientForm />} />
            <Route path="/clientes/edit/:id" element={<ClientForm />} />
          </Routes>
        </Container>
      </ClientContext.Provider>
    </PetContext.Provider>
  );
}

export default App;