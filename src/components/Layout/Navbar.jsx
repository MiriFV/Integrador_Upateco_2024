import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const { token } = useAuth("state");
    console.log(token)
    const { logout } = useAuth("actions");
    const { isAuthenticated } = useAuth("state");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes manejar la búsqueda, por ejemplo, redireccionando a una página de resultados
        navigate(`recetario/?title=${searchTerm}`);
        console.log("captura busqueda ", searchTerm);
    };


    return (
        <header>
            <nav
                className={"navbar"}
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-start">
                    <NavLink
                        to="/"
                        className={({ isActive, isPending, isTransitioning }) =>
                            [
                                isPending ? "pending" : "",
                                isActive ? "has-text-primary" : "",
                                isTransitioning ? "transitioning" : "",
                            ].join(" navbar-item")
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/recetario"
                        className={({ isActive, isPending, isTransitioning }) =>
                            [
                                isPending ? "pending" : "",
                                isActive ? "has-text-primary" : "",
                                isTransitioning ? "transitioning" : "",
                            ].join(" navbar-item")
                        }
                    >
                        Recetario
                    </NavLink>

                    {isAuthenticated ? (
                        <>
                        <NavLink
                            to="/profile"
                            className={({ isActive, isPending, isTransitioning }) =>
                                [
                                    isPending ? "pending" : "",
                                    isActive ? "has-text-primary" : "",
                                    isTransitioning ? "transitioning" : "",
                                ].join(" navbar-item")
                            }
                        > Mi Perfil </NavLink>
                        <button className="button ">
                            <NavLink
                                to="/recetario/new"
                                className={({ isActive, isPending, isTransitioning }) =>
                                    [
                                        isPending ? "pending" : "",
                                        isActive ? "has-text-primary" : "",
                                        isTransitioning ? "transitioning" : "",
                                    ].join(" navbar-item")
                                }>
                                Crear Receta</NavLink></button>
                        <button
                            onClick={logout}
                            className="navbar-item button is-danger"
                        >
                            Logout</button></>
                    ) : (
                        <>
                        <NavLink
                            to="/login"

                            className={({ isActive, isPending, isTransitioning }) =>
                                [
                                    isPending ? "pending" : "",
                                    isActive ? "has-text-primary" : "",
                                    isTransitioning ? "transitioning" : "",
                                ].join(" navbar-item")
                            }
                        >
                            Login
                        </NavLink>
                        </>
                    )}
                </div>

                <div className="navbar-end">
                    <form onSubmit={handleSearchSubmit} className="navbar-item">
                        <input
                            type="text"
                            className="input"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button type="submit" className="button">
                            Buscar
                        </button>
                    </form>
                </div>
            </nav>
        </header>
    );
}
