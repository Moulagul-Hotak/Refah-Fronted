import React, { useState } from "react";
import SingleUser from "./SingleUser";
import CreateNewUser from "./CreateNewUser";

function Users(allUsers) {
    const [createNewUser, setCreateNewUser] = useState(false);
    return <>
        <div className="card">
            {
                createNewUser ? <CreateNewUser /> :
                    <>
                        <div className="card-header d-flex justify-content-between">
                            <h1>Users List</h1>
                            <div>
                                
                                <button className="btn btn-outline-success" onClick={() => setCreateNewUser(true)}>New User</button>
                            </div>
                        </div>
                        <div className="card-body">
                            {
                                allUsers.allUsers.length > 0 ?
                                    <table className="table table-head-fixed table-responsive-lg table-hover text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Image</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                allUsers.allUsers.map((user) => (
                                                    <SingleUser user={user} />
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    : <h1 className="text-center">No Record Available</h1>
                            }
                        </div></>
            }

        </div>

    </>
}

export default Users;