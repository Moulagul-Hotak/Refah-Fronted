import React from "react";
import { Link } from "react-router-dom";
import SingleUser from "./SingleUser";

function Users(allUsers) {
    return <>
        <div className="card">
            <div className="card-header d-flex justify-content-between">
                <h1>Users List</h1>
                <div>
                    <Link to="/createUser" className="btn btn-outline-primary">New User</Link>
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
            </div>

        </div>

    </>
}

export default Users;