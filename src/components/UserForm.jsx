/**
 * Este componente es una parte de la interfaz que muestra el formulario de registro.
 * 
 * También maneja algunos estados para manejar los datos del formulario.
 */
const UserForm = ({ user, selectedUser, handleSubmit, handleChange, clearForm }) => {
    return (
        <div className="col-md-6 border p-3 w-60">
            <h4 className="text-center">FORMULARIO REGISTRO</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label>Name:</label>
                    <input type="text" value={user.name} name="name" className="form-control" 
                        onChange={handleChange} placeholder="Enter user name" />

                    <label>Phone:</label>
                    <input type="number" value={user.phone} name="phone" className="form-control" 
                        onChange={handleChange} placeholder="Enter user phone" />

                    <label>Email:</label>
                    <input type="email" value={user.email} name="email" className="form-control" 
                        onChange={handleChange} placeholder="Enter user email" />
                    
                    <div className='py-2'>
                        {/* verificar si formulario para registro o actualización */}
                        <button type="submit" className="btn btn-primary w-50">
                            {selectedUser ? "Update" : "Add User"}
                        </button>
                    </div>
                </div>
            </form>
            <button onClick={clearForm} className="btn btn-success w-50">Clean</button>
        </div>
    );
};

export default UserForm;