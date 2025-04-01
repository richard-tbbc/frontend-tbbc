import React, { useEffect, useState } from 'react';
import UserForm from './UserForm';
import { fetchUsers, addUser, updateUser, deleteUser } from '../services/userService';

/**
 * Es un componente principal de la interfaz que permite mostrar los usuarios, asi como editar y eliminar
 */

const UserList = () => {
    
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [user, setUser] = useState({ name: "", phone: "", email: "" });
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    /**
     * Cargar los usuarios desde la api
     */
    const loadUsers = async () => {
        const data = await fetchUsers();
        setUsers(data);
    };

    /**
     * Se realizan handles para manejar los datos del formulario
     */

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user.name.trim()) return;
        selectedUser ? await updateUser(user, selectedUser.id) : await addUser(user);
        setSelectedUser(null);
        setUser({ name: "", phone: "", email: "" });
        loadUsers();
    };

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    /**
     * Limpiar el formulario
     */
    const clearForm = () => {
        setSelectedUser(null);
        setUser({ name: "", phone: "", email: "" });
    };

    return (
        <div className="container p-5">
            <div className="row">
                <UserForm user={user} selectedUser={selectedUser} handleSubmit={handleSubmit} handleChange={handleChange} clearForm={clearForm} />
                <div className="col-md-6 border p-3">
                    <h4 className="text-center">LISTA DE CONTACTOS</h4>
                    <input type="text" className="form-control mb-2" placeholder="Buscar user..." onChange={(e) => setSearch(e.target.value)} />
                    {/* Aquí se realiza el filtro para los usuarios */}
                    {users.filter((c) => search.length < 3 || c.name.toLowerCase().includes(search.toLowerCase()))
                        .map((user) => (
                            <div key={user.id} className="border p-2 mb-2">
                                <div className='row text-start'>
                                    <div className='col-md-8'>
                                        <p><strong>{user.name}</strong></p>
                                        <p><strong>Tel: {user.phone}</strong></p>
                                        <p><strong>Email: {user.email}</strong></p>
                                    </div>
                                    <div className='col-md-4'>
                                        <button className="btn btn-secondary w-100" onClick={() => { setUser(user); setSelectedUser(user); }}>Edit</button>
                                        <div className='py-2'>
                                            <button className="btn btn-danger w-100" onClick={async () => { await deleteUser(user.id); loadUsers(); }}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default UserList;