import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

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
                        // style={({ isActive }) =>
                        //     isActive ? { color: "red" } : {}
                        // }
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
                    <NavLink
                        to="/profile"
                        className={({ isActive, isPending, isTransitioning }) =>
                            [
                                isPending ? "pending" : "",
                                isActive ? "has-text-primary" : "",
                                isTransitioning ? "transitioning" : "",
                            ].join(" navbar-item")
                          }
                    >
                        My Perfil
                    </NavLink>
                    
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
