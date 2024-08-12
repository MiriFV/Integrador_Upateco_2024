import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// Componente para mostrar la primera tarjeta con la información básica de la receta
const FrirstCard = ({ recipe })=>{
    return (
        <div className="card">
            {recipe.image && <img src={recipe.image} alt={recipe.title} />}
            <div className="card-content">
                <h2 className="title is-1">{recipe.title}</h2>
                <p><strong>Tiempo de preparación:</strong> {recipe.preparation_time} minutos</p>
                <p><strong>Tiempo de cocción:</strong> {recipe.cooking_time} minutos</p>
            </div>
        </div>
    );
};

// Componente para mostrar la segunda tarjeta con la descripción de la receta
const SecondCard = ({ recipe }) =>{
    return (
        <div className="card">
            <div className="card-content">
                <h2 className="title is-2">Descripcion</h2>
                <p>{recipe.description}</p>
            </div>
        </div>
    );
};

// Componente para mostrar la tercera tarjeta con los ingredientes de la receta
const ThirdCard = ({ ingredients }) => {
    return (
        <div className="card">
            <div className="card-content">
                <h3 className="title is-3">Ingredientes:</h3>
                <ul>
                    {ingredients && ingredients.length > 0 ? (
                        ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient.name}</li>
                        ))
                    ) : (
                        <p>No hay ingredientes disponibles.</p>
                    )}
                </ul>
            </div>    
        </div>
    );
};

// Función para obtener los detalles del usuario
const useGetUser = (idUser) => {
    const [user, setUser] = useState(null);
    const auth = useAuth("state");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}users/profiles/${idUser}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Token ${auth.token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Error al obtener los datos del usuario");
                }

                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, [idUser, auth.token]);

    return user;
};

const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString();  // Esto devuelve una fecha en formato local
};

const ComentCard = ({ comentario }) => { 
    const user = useGetUser(comentario.author);

    return (
        <div className="card">
            <div className="card-content">
                <p><strong>Usuario: </strong> {user ? `${user.first_name} ${user.last_name}` : "Cargando..."}</p>
                <p><strong>Fecha de actualización:</strong> {formatDate(comentario.updated_at)}</p>
                <p><strong>Comentario:</strong> {comentario.comment}</p>
                <p><strong>Rating:</strong> {comentario.rating}</p>
            </div>
        </div>
    );
};

const Detail = () => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [ingredients, setIngredients] = useState([]);  // Estado para almacenar los ingredientes
    const { id } = useParams();
    const [selectComents, setSelectComents] = useState(null);
    const [averageRating, setAverageRating] = useState(0);
    const auth = useAuth("state");

    const { token } = auth;
    const userID  = auth.userID;
    const navigate = useNavigate();
     
    console.log("usuario Id: ", userID);
    
    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipes/${id}/`);
                if (!response.ok) {
                    throw new Error("No se pudo cargar los datos");
                }
                const foundRecipe = await response.json();
                
                if (foundRecipe) {
                    setSelectedRecipe(foundRecipe); // Establecer la receta seleccionada en el estado
                    fetchIngredients(foundRecipe.ingredients); // Llamar a la función para obtener los ingredientes usando los IDs
                } else {
                    console.log("La receta no fue encontrada.");
                }
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        const fetchIngredients = async (ingredientIds) => {
            try {
                const ingredientsData = await Promise.all(
                    ingredientIds.map(async (ingredientId) => {
                        const response = await fetch(`https://sandbox.academiadevelopers.com/reciperover/ingredients/${ingredientId}/`);
                        if (!response.ok) {
                            throw new Error(`No se pudo cargar el ingrediente con ID ${ingredientId}`);
                        }
                        return await response.json();
                    })
                );
                setIngredients(ingredientsData); // Guardar los ingredientes en el estado
            } catch (error) {
                console.error("Error al obtener los ingredientes:", error);
            }
        };

        const fetchComent = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/ratings/?page_size=1000`);
                if (!response.ok) {
                    throw new Error("No se pudo cargar los datos");
                }
                const datacoment = await response.json();
                const coments = datacoment.results.filter(comment => parseInt(comment.recipe) === parseInt(id));

                // Calcular promedio de rating
                const ratings = coments.map(comment => comment.rating);
                const ratingSum = ratings.reduce((acc, curr) => acc + curr, 0);
                const averageRating = ratingSum / coments.length;

                if (coments) {
                    setSelectComents(coments);
                    if (!averageRating === NaN)
                        setAverageRating(averageRating);
                } else {
                    console.log("No se encontraron comentarios para la receta con id:", id);
                }
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
        fetchComent();
    }, [id]);  // Ejecutar el efecto cada vez que cambia el id

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const comentData = {
                rating,
                comment,
                recipe: id,
            };
            
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/ratings/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,  // Incluye el token en la cabecera de autorización
                },
                body: JSON.stringify(comentData),
            });

            if (!response.ok) throw new Error('Error al agregar Comentario');
            
            const result = await response.json();
            console.log("Comentario creado:", result);
            navigate(`/recetario/${id}`);  // Redirige a la página de la receta después de agregar el comentario
            window.location.reload(); 
        } catch (error) {
            console.error('Error al agregar comentario:', error);
        }
    };

    if (!selectedRecipe) {
        return <p>Cargando...</p>;
    }

return (
    <>
    <div>
        <p>Puntuación de usuario: {averageRating}</p>
        <FrirstCard recipe = {selectedRecipe}/>
        <SecondCard recipe = {selectedRecipe}/>
        <ThirdCard recipe = {selectedRecipe}/>
       {selectedRecipe.owner == userID?
       ( <button className="button is-primary"  onClick={() => navigate(`/recetario/edit/${selectedRecipe.id}`)}>Editar</button>
       ): null}
       {selectedRecipe.owner == userID?
       ( <button className="button is-primary"  onClick={() => navigate(`/recetario/delete/${selectedRecipe.id}`)}>Eliminar</button>
       ): null}
    </div>
    <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="comentario">Comentario:</label><br />
                <input type="text" id="comentario" name="comment" onChange={(e) => setComment(e.target.value)} /><br />
                <label htmlFor="valoracion">Valoración:</label><br />
                <select id="valoracion" name="rating" onChange={(e) => setRating(e.target.value)}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select><br />
                {selectedRecipe.owner == userID?
                (<input type="submit" value="Enviar" />): null}
            </form>


    </div>

    <div>
    <h1>Comentarios:</h1>
    {selectComents && selectComents.length > 0 ? (
        selectComents.map((comentario) => (
            <div key={comentario.id} className="column is-one-third">
                <ComentCard comentario={comentario} />
            </div>
        ))
    ) : (
        <p>No hay comentarios disponibles.</p>
    )}

</div>
    </>
);

};

export default Detail;
