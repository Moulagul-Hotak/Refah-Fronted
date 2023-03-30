import axios from "axios";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";

const API_URL = "http://localhost:8000/api/users/";
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

function CreateNewUser() {

    const navigate = useNavigate();
    const { userID } = useParams();
    const [user, setUser] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: user?.name,
            email: user?.email
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required'),
            email: Yup.string()
                .required('Email is required')
                .email('Enter a correct email'),
            image: Yup.mixed()
                .nullable()
                .test(
                    "FILE_SIZE",
                    "Your image is too big :(",
                    (value) => !value || (value && value.size <= 1024 * 1024)
                )
                .test(
                    "FILE_TYPE",
                    "Please select image :(",
                    (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
                ),
            new_password: Yup.string()
                .nullable()
                .min(5, 'Password must be at least 5 char long'),
            confirm_new_password: Yup.string()
                .nullable()
                .oneOf([Yup.ref('password')], 'Passwords does not match'),
        }),
        onSubmit: async () => {
            const formData = new FormData(document.getElementById('editUserForm'));
            axios.post(
                `${API_URL+userID}`,
                formData)
                .then((response) => {
                    navigate('/');
                }).catch((error) => {
                    if (error.response.data.code === 400) {
                        console.log(error.response.data.error);
                    }
                });
        },
        enableReinitialize: true,
    })

    const fetchUser = async () => {
        const response = await fetch(`${API_URL + userID}`);
        const data = await response.json();
        setUser(data.data);
        document.getElementById('name').setAttribute('value', data.data?.name);
        document.getElementById('email').setAttribute('value', data.data?.email);
    }

    useEffect(() => {
        fetchUser()
    }, [userID])

    return <>
        <div className="mx-auto row">
            <div className="col-lg-6">
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        <h3>
                            Edit User
                        </h3>
                        <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>Back</button>
                    </div>
                    <div className="card-body">
                        <form id="editUserForm" onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name: </label>
                                <input type="text" className="form-control" id="name" name="name" onChange={(e) => { formik.setFieldValue('name', e.target.value) }} />
                                <span className="text-danger">
                                    {formik.errors.name && (
                                        <span className="text-danger">{formik.errors.name}</span>
                                    )}
                                </span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email: </label>
                                <input type="text" className="form-control" id="email" onChange={(e) => { formik.setFieldValue('email', e.target.value) }} name="email" />
                                {formik.errors.email && (
                                    <span className="text-danger">{formik.errors.email}</span>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Image: </label>
                                <input type="file" className="form-control" onChange={(e) => { formik.setFieldValue('image', e.target.files[0]) }} name="image" />
                                {formik.errors.image && (
                                    <span className="text-danger">{formik.errors.image}</span>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="new_password">Password: </label>
                                <input type="new_password" className="form-control" onChange={(e) => { formik.setFieldValue('new_password', e.target.value) }} name="new_password" />
                                {formik.errors.new_password && (
                                    <span className="text-danger">{formik.errors.new_password}</span>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirm_new_password">Confirm Password: </label>
                                <input type="confirm_new_password" className="form-control" onChange={(e) => { formik.setFieldValue('confirm_new_password', e.target.value) }} name="confirm_new_password" />
                                {formik.errors.confirm_new_password && (
                                    <span className="text-danger">{formik.errors.confirm_new_password}</span>
                                )}
                            </div>
                            <button type="submit" className="btn btn-outline-success">Save</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <img src={user?.image_path} alt={user?.name} width="300px" height="300px" style={{borderRadius: "50%"}}/>
            </div>
        </div>
    </>
}

export default CreateNewUser;