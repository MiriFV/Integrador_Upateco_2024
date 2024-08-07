import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
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
            </nav>
        </header>
    );
}
