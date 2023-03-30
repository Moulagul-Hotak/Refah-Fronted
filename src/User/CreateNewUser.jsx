import axios from "axios";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import { useState } from "react";

const API_URL = "http://localhost:8000/api/users";
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

function CreateNewUser() {

    const navigate = useNavigate();
    const [img, setImg] = useState("");

    const formik = useFormik({
        initialValues: {
            image: ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required'),
            email: Yup.string()
                .required('Email is required')
                .email('Enter a correct email'),
            image: Yup.mixed()
                .required("Image is Required")
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
            password: Yup.string()
                .required('Password is required')
                .min(5, 'Password must be at least 5 char long'),
            confirm_password: Yup.string()
                .required('Password is mendatory')
                .oneOf([Yup.ref('password')], 'Passwords does not match'),
        }),
        onSubmit: async () => {
            const formData = new FormData(document.getElementById('newUserForm'));
            formData.set('image', img);
            axios.post(
                API_URL,
                formData)
                .then((response) => {
                    navigate('/');
                }).catch((error) => {
                    if (error.response.data.code === 400) {
                        // console.log(error.response.data.error);
                    }
                });
        }
    })

    const imageResizer = (image) => {
        return new Promise((resolve) => {
            Resizer.imageFileResizer(
                image,
                400, // New width
                400, // New height
                'JPG', // Output format
                100, // Quality
                0, // Rotation
                (uri) => {
                    setImg(uri);
                },
                'blob' // Output type
                , 200, 200
            );
        });
    };

    return <>
        <div className="col-lg-6 mx-auto">
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    <h3>
                        Create New User
                    </h3>
                    <button className="btn btn-outline-primary" onClick={() => navigate(-1)}>Back</button>
                </div>
                <div className="card-body">
                    <form id="newUserForm" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name: </label>
                            <input type="text" className="form-control" name="name" onChange={(e) => { formik.setFieldValue('name', e.target.value) }} />
                            <span className="text-danger">
                                {formik.errors.name && (
                                    <span className="text-danger">{formik.errors.name}</span>
                                )}
                            </span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input type="text" className="form-control" onChange={(e) => { formik.setFieldValue('email', e.target.value) }} name="email" />
                            {formik.errors.email && (
                                <span className="text-danger">{formik.errors.email}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image: </label>
                            <input type="file" className="form-control" onChange={(e) => { imageResizer(e.target.files[0]); formik.setFieldValue('image', e.target.files[0]) }} name="image" id="image" />
                            {formik.errors.image && (
                                <span className="text-danger">{formik.errors.image}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password: </label>
                            <input type="password" className="form-control" onChange={(e) => { formik.setFieldValue('password', e.target.value) }} name="password" />
                            {formik.errors.password && (
                                <span className="text-danger">{formik.errors.password}</span>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm_password">Confirm Password: </label>
                            <input type="password" className="form-control" onChange={(e) => { formik.setFieldValue('confirm_password', e.target.value) }} name="confirm_password" />
                            {formik.errors.confirm_password && (
                                <span className="text-danger">{formik.errors.confirm_password}</span>
                            )}
                        </div>
                        <button type="submit" className="btn btn-outline-success">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default CreateNewUser;