import React, { useEffect, useState } from 'react';
import api from '../api';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [user, setUser] = useState({name: "", phone:"", email: ""});
    const [search, setSearch] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (user.name.trim() === "") return;
    
        if (selectedUser !== null) {
          // Editar user existente
          //setUser((user) =>({...user, id: selectedUser.id }))
          updateUser(user, selectedUser.id)
           setSelectedUser(null);
        } else {
          // Agregar nuevo user
          addUser(user)
        }
    
        setUser({name: "", phone:"", email: ""});
    };

    const addUser = async (u) => {
    try {
        await api.post('/api/v1/users', { name: u.name, phone: u.phone, email: u.email });
        fetchUsers();  // Refresh the list after adding a user
    } catch (error) {
        console.error("Error adding user", error);
    }
    };

    const fetchUsers = async () => {
    try {
        const response = await api.get('/api/v1/users');
        setUsers(response.data.users);
    } catch (error) {
        console.error("Error fetching users", error);
    }
    };

    const updateUser = async (user, id) => {
    try {
        console.log(user)
        await api.put(`/api/v1/users/${id}`, user);
        fetchUsers();  // Refresca la lista después de actualizar un usuario
    } catch (error) {
        console.error("Error updating user", error);
    }
    };

    const deleteFruit = async (fruitId) => {
        try {
          await api.delete(`/api/v1/users/${fruitId}`);
          fetchUsers();  // Refresca la lista después de eliminar
        } catch (error) {
          console.error("Error deleting fruit", error);
        }
    };

    const handleName = (e) => {
        setUser((prevUser) => ({
          ...prevUser, // Mantiene el resto de los valores del objeto
          name: e.target.value, // Solo actualiza "name"
        }));
    };

    const handlePhone = (e) => {
        setUser((prevUser) => ({
          ...prevUser, // Mantiene el resto de los valores del objeto
          phone: e.target.value, // Solo actualiza "name"
        }));
    };

    const handleEmail = (e) => {
        setUser((prevUser) => ({
          ...prevUser, // Mantiene el resto de los valores del objeto
          email: e.target.value, // Solo actualiza "name"
        }));
    };

    useEffect(() => {
        fetchUsers();
      }, []);

    return (
    <div>
        <h2>Users List</h2>
        <div className="container mt-4">
        <div className="row">
        {/* Formulario Registro */}
        <div className="col-md-6 border p-3">
            <h4 className="text-center">FORMULARIO REGISTRO</h4>
            <form onSubmit={handleSubmit}>
            <div className="mb-2">
            <label>Name:</label>
            <input type="text"
            value={user.name} name="name" className="form-control" 
            onChange={handleName}
            placeholder="Enter user name"/>

            <label>Phone:</label>
            <input type="text"
            value={user.phone} name="pone" className="form-control" 
            onChange={handlePhone}
            placeholder="Enter user Phone"/>

            <label>Email:</label>
            <input type="text"
            value={user.email} name="email" className="form-control" 
            onChange={handleEmail}
            placeholder="Enter user email"/>
        
        <button type="submit" className="btn btn-primary w-100">
            {selectedUser !== null ? "Update" : "Add User"}
        </button>
        
            </div>
            </form>
            <button onClick={() =>{ setSelectedUser(null); setUser({name: "", phone:"", email: ""});}} className="btn btn-success w-100">
            clean
        </button>

        </div>

        {/* Lista de usuarios */}
        <div className="col-md-6 border p-3">
                <h4 className="text-center">LISTA DE USUARIOS</h4>
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Buscar user…."
                    onChange={(e) => setSearch(e.target.value)}
                />
                {users
        .filter((c) => search.length < 3 || c.name.toLowerCase().includes(search.toLowerCase()))
        .map((user) => (
            <div key={user.id} className="border p-2 mb-2">
                <p><strong>{user.name}</strong></p>
                
                <button className="btn btn-secondary btn-sm me-2" onClick={() =>{ setUser({name: user.name,phone: user.phone,email: user.email}); setSelectedUser(user)}}>Edit</button>
                <button class="btn btn-danger"
        onClick={() => deleteFruit(user.id)} 
        >delete</button>
            </div>
            ))}   
        </div>

        </div>
        </div>
       
        {/* <UpdateFruitForm updateFruit={updateFruit} fruitToUpdate={selectedFruit} /> */}
        
    </div>
    );
    
}

export default UserList;