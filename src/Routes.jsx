import { useRoutes } from "react-router-dom";
import App from "./App";
import CreateNewUser from "./User/CreateNewUser";
function Routes(){
    const routes = useRoutes([
        { path: '/', element: <App /> },
        { path: '/createUser', element: <CreateNewUser /> }
    ]);
    return routes;
}

export default Routes;