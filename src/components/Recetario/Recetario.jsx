
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"; // Importar hook para obtener la ubicación actual

const RecipeCard = ({ recipe }) => {
    const navigate = useNavigate();
    return (
        <div className="card" onClick={() => navigate(`/recetario/${recipe.id}`)}>
            {recipe.image && <img src={recipe.image} alt={recipe.title} />}
            <div className="card-content">
                <h2 className="title is-4">{recipe.title}</h2>
                <p>{recipe.description}.</p>
            </div>
        </div>
    );
};

const RecipeList = () => {
    // Definir estados
    const [page, setPage] = useState(1); // Estado para la página actual
    const [nextURL, setNextURL] = useState(null); // Estado para la URL de la siguiente página de recetas
    const [recipes, setRecipes] = useState([]);  // Estado para las recetas obtenidas
    const [isLoading, setIsLoading] = useState(false); // Estado para el estado de carga
    // Obtener los parámetros de búsqueda de la URL
    const location = useLocation(); 
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("title"); // Obtener el término de búsqueda del parámetro 'title'

     // Función para obtener recetas de la API
    const fetchRecipes = async () => {
        setIsLoading(true);// Establecer el estado de carga a true

        // Construir la query string con los parámetros necesarios
        let query = new URLSearchParams({
            page: page,
            page_size: 5,
            ...(searchTerm && { title: searchTerm }), // Solo agregar 'title' si searchTerm no es null
        }).toString();

        // Realizar la solicitud fetch
        fetch(`https://sandbox.academiadevelopers.com/reciperover/recipes/?${query}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudieron cargar las recetas"); // Lanzar error si la respuesta no es ok
                }
                return response.json(); // Parsear la respuesta a JSON
            })
            .then((data) => {
                // Actualizar el estado de las recetas
                if (data.results) {
                    setRecipes((prevRecipes) => [...prevRecipes, ...data.results]);
                    setNextURL(data.next); // Establecer la URL de la siguiente página
                }
            })
            .catch(() => {
                console.error("Error al cargar las recetas."); // Manejo de errores
            })
            .finally(() => {
                setIsLoading(false); // Establecer el estado de carga a false
            });
    };

    // Función para cargar más recetas al hacer clic en el botón
    const loadMoreRecipes = () => {
        if (nextURL) {
            setPage((currentPage) => currentPage + 1);
        }
    };

    // Efecto para reiniciar recetas y página cuando searchTerm cambia
    useEffect(() => {
        setRecipes([]);
        setPage(1);
    }, [searchTerm]);

    // Efecto para obtener recetas cuando page o searchTerm cambian
    useEffect(() => {
        fetchRecipes();
    }, [page, searchTerm]);

    return (
        <div className="conteiner">
            <h1 className="title">Lista de Recetas</h1>
            {recipes.map((recipe) => (
                <div key={recipe.id} className="column is-one-third">
                    <RecipeCard recipe={recipe} />
                </div>
            ))}
            {isLoading && <p>Cargando más recetas...</p>}
            {nextURL && !isLoading && (
                <button className="button is-primary" onClick={loadMoreRecipes}>
                    Cargar más recetas
                </button>
            )}
        </div>
    );
};

export default RecipeList;