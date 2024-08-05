import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout.jsx";
import Home from "../pages/Home.jsx";
import Login from "../components/Auth/Login.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Profile from "../pages/Profile.jsx";
import Recetario from "../components/Recetario/Recetario.jsx";
import RecetarioDetail from "../components/Recetario/RecetarioDetail.jsx"
import RecetarioEdit from "../components/Recetario/RecetarioEdit.jsx"
import RecetarioForm from "../components/Recetario/RecetarioForm.jsx"


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
                                <RecetarioForm />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "edit",
                        element: (
                            <ProtectedRoute>
                                <RecetarioEdit />
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