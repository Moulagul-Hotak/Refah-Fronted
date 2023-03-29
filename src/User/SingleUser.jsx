import React from "react";

function SingleUser(singleUser) {
    return <>
        <tr>
            <td>{singleUser.user.id}</td>
            <td>{singleUser.user.name}</td>
            <td>{singleUser.user.email}</td>
            <td>
                <a href={singleUser.user.image_path} download={singleUser.user.name} target="blank">
                    <img src={singleUser.user.image_path}
                        alt={singleUser.user.name}
                        style={{ maxWidth: "100px", maxHeight: "50px", marginTop: "-10px" }}
                    />
                </a>
            </td>
            <td>
            <button className="btn btn-outline-primary mr-2">Edit</button>
            <button className="btn btn-outline-danger">Delete</button>
            </td>
        </tr>
    </>
}

export default SingleUser;