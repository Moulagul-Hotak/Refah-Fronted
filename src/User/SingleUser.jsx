import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8000/api/users/";
function SingleUser(singleUser) {

    const deleteUser = (userId) => {
        axios.delete(
            `${API_URL+userId}`)
            .then((response) => {
                document.getElementById(userId).remove();
            }).catch((error) => {
                console.log(error);
                if (error.response.data.code === 400) {
                    console.log(error.response.data.error);
                }
            });
    }

    return <>
        <tr id={singleUser.user.id}>
            <td>{singleUser.user.id}</td>
            <td>{singleUser.user.name}</td>
            <td>{singleUser.user.email}</td>
            <td>
                <a href={singleUser.user.image_path} download={singleUser.user.name} target="blank">
                    <img src={singleUser.user.image_path}
                        alt={singleUser.user.name}
                        style={{ maxWidth: "100px", maxHeight: "50px", marginTop: "-10px", borderRadius: "25px"}}
                    />
                </a>
            </td>
            <td>
            <Link to={`/editUser/${singleUser.user.id}`} className="btn btn-outline-primary mr-2">Edit</Link>
            <button className="btn btn-outline-danger" onClick={() => deleteUser(singleUser.user.id)}>Delete</button>
            </td>
        </tr>
    </>
}

export default SingleUser;