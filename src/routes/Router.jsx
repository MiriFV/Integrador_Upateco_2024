import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout.jsx";
import Home from "../pages/Home.jsx";
import Login from "../components/Auth/Login.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Profile from "../pages/Profile.jsx";
import Recetario from "../components/Recetario/Recetario.jsx";
import RecetarioDetail from "../components/Recetario/RecetarioDetail.jsx"
import RecetaEdit from "../components/Recetario/RecetaEdit.jsx"
import RecetaNew from "../components/Recetario/RecetaNew.jsx"


const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true, // path: "/"
                element: <Home />,
            },
            {
                path: "recetario",
                children: [
                    {
                        index: true,
                        element: <Recetario />,
                    },
                    {
                        path: ":id",
                        element: <RecetarioDetail />,
                    },
                    {
                        path: "new",
                        element: (
                            <ProtectedRoute>
                                <RecetaNew />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "edit",
                        element: (
                            <ProtectedRoute>
                                <RecetaEdit />
                            </ProtectedRoute>
                        ),
                    },
                ],
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: "*",
        element: (      <div>
            <h1>404 - Página no encontrada</h1>
            <p>Esta receta no existe... aún... </p>
          </div>),
    },
]);

export { Router };