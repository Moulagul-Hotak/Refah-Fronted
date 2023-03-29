import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const API_URL = "http://localhost:8000/api/users";

function CreateNewUser() {

    const [CreateNewUserForm, setCreateNewUserFormValue] = useState({ name: '', email: '', password: '', confirm_password: '' });
    const { register, formState: { errors }, handleSubmit } = useForm();
    const handleFormSubmit = () => {
        // e.preventDefault();
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
                    <form action={API_URL} method="post" onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="form-group">
                            <label htmlFor="name">Name: </label>
                            <input type="text" className="form-control" name="name" {...register("name", { required: true })} />
                            <span className="text-danger">
                                {errors.name?.type === "required" && "Name is Required"}
                            </span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input type="text" className="form-control" {...register("email", { required: true })} name="email" />
                            <span className="text-danger">
                                {errors.email?.type === "required" && "Email is Required"}
                            </span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password: </label>
                            <input type="password" className="form-control" {...register("password", { required: true })} name="password" />
                            <span className="text-danger">
                                {errors.password?.type === "required" && "Password is Required"}
                            </span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm_password">Confirm Password: </label>
                            <input type="password" className="form-control" {...register("confirm_password", { required: true })} name="confirm_password" />
                            <span className="text-danger">
                                {errors.confirm_password?.type === "required" && "Confirm Password is Required"}
                            </span>
                        </div>
                        <button type="submit" className="btn btn-outline-success">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default CreateNewUser;