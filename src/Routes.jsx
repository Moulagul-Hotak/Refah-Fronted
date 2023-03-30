import { useRoutes } from "react-router-dom";
import App from "./App";
import CreateNewUser from "./User/CreateNewUser";
import EditUser from "./User/EditUser";
function Routes(){
    const routes = useRoutes([
        { path: '/', element: <App /> },
        { path: '/createUser', element: <CreateNewUser /> },
        { path: '/editUser/:userID', element: <EditUser /> }
    ]);
    return routes;
}

export default Routes;