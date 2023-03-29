import axios from "axios";
import React, { useState } from "react";

const API_URL = "http://localhost:8000/api/users";

function CreateNewUser() {

    const [CreateNewUserForm, setCreateNewUserFormValue] = useState({ name: '', email: '', password: '', confirm_password: '' });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.post(
            API_URL,
            CreateNewUserForm)
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                if (error.response.data.code === 400) {
                    console.log(error.response.data.error);
                }
            });
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCreateNewUserFormValue({ ...CreateNewUserForm, [name]: value })
    }
    return <>
        <div className="col-lg-6 mx-auto">
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    <h3>
                        Create New User
                    </h3>
                    <button className="btn btn-outline-primary">Back</button>
                </div>
                <div className="card-body">
                    <form action={API_URL} method="post" onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name: </label>
                            <input type="text" className="form-control" value={CreateNewUserForm.name} onChange={handleInput} name="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input type="email" className="form-control" value={CreateNewUserForm.email} onChange={handleInput} name="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password: </label>
                            <input type="password" className="form-control" value={CreateNewUserForm.password} onChange={handleInput} name="password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm_password">Confirm Password: </label>
                            <input type="password" className="form-control" value={CreateNewUserForm.confirm_password} onChange={handleInput} name="confirm_password" />
                        </div>
                        <button type="submit" className="btn btn-outline-success">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default CreateNewUser;