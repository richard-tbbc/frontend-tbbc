import api from '../api';
/**
 * Este servicio es el encargo de conectar con el backend,
 * aquí se organizan todos los endpoints necesarios para el funcionamiento
 * @returns 
 */

// obtener todos los usuarios
export const fetchUsers = async () => {
    try {
        const response = await api.get('/api/v1/users');
        return response.data.users;
    } catch (error) {
        console.error("Error fetching users", error);
        return [];
    }
};

// Agregar un user nuevo
export const addUser = async (user) => {
    try {
        await api.post('/api/v1/users', user);
    } catch (error) {
        console.error("Error adding user", error);
    }
};

//actualizar un usuario
export const updateUser = async (user, id) => {
    try {
        await api.put(`/api/v1/users/${id}`, user);
    } catch (error) {
        console.error("Error updating user", error);
    }
};

//eliminar un usuario
export const deleteUser = async (id) => {
    try {
        await api.delete(`/api/v1/users/${id}`);
    } catch (error) {
        console.error("Error deleting user", error);
    }
};