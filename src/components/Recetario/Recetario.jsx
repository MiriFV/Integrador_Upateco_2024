import Navbar from "../Navbar";
import React, { useEffect, useState, useRef } from "react";
//import RecipeCard from "./RecetarioCard";
import { useNavigate } from "react-router-dom";

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
    const [page, setPage] = useState(1);
    const [nextURL, setNextURL] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchRecipes = async () => {
        setIsLoading(true);
        fetch(`https://sandbox.academiadevelopers.com/reciperover/recipes/?page=${page}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudieron cargar las recetas");
                }
                return response.json();
            })
            .then((data) => {
                if (data.results) {
                    setRecipes((prevRecipes) => [...prevRecipes, ...data.results]);
                    setNextURL(data.next);
                }
            })
            .catch(() => {
                console.error("Error al cargar las recetas.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const loadMoreRecipes = () => {
        if (nextURL) {
            setPage((currentPage) => currentPage + 1);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, [page]);

    return (
        <div>
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