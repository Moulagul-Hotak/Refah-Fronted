import React from "react";
import SingleUser from "./SingleUser";

function Users(allUsers) {
    return <>
        <div className="card">
            <div className="card-header">
                <h1>Users List</h1>
            </div>
            <div className="card-body">
                {
                    allUsers.allUsers.length > 0 ?
                        <div className="table table-responsive p-0">
                            <table className="table table-head-fixed text-nowrap">
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
                        </div> 
                        : <h1 className="text-center">No Record Available</h1>
                }
            </div>
        </div>

    </>
}

export default Users;