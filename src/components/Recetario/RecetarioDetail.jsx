import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importar useParams y useNavigate
import { useAuth } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
//import myUseFetch from "../../hooks/myUseFetch";


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
                <p>{recipe.description}.</p>
            </div>
        </div>
    );
};

// Componente para mostrar la tercera tarjeta con los ingredientes de la receta
const ThirdCard = ({ recipe }) =>{
    return (
        <div className="card">
            
            <div className="card-content">
            <h3 className="title is-3">Ingredientes:</h3>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>    
        </div>
    );
};

const useGetUser = (idUser) => {
    const [user, setUser] = useState(null);
    const auth = useAuth("state");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(
                    `https://sandbox.academiadevelopers.com/users/profiles/${idUser}`,
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
    console.log(user)
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
                <p><strong>Usuario: </strong> {user ? user.first_name+" "+ user.last_name: "Cargando..."}</p>
                <p><strong>Fecha de actualización:</strong> {formatDate(comentario.updated_at)}</p>
                <p><strong>Comentario:</strong> {comentario.comment}</p>
                <p><strong>Rating:</strong> {comentario.rating}</p>
            </div>
        </div>
    );
};

const Detail = () => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);  // Estado para almacenar la receta seleccionada
    const { id } = useParams();  // Obtener el id de la receta de los parámetros de la URL
    const [selectComents, setSelectComents] = useState(null);
    const [averageRating, setAverageRating] = useState(0);
    const auth = useAuth("state");
<<<<<<< Updated upstream
    const { token } = auth;
    const userID  = auth.userID;
    const navigate = useNavigate();
     
=======
    
    const { userID } = useAuth("state");
    console.log("usuario Id: ", userID);
    
>>>>>>> Stashed changes
    useEffect(() => {
        const fetchData = async () => {
            // Función para obtener los datos de las recetas desde la API
            try {
                const response = await fetch(`https://sandbox.academiadevelopers.com/reciperover/recipes/${id}/`);
                if (!response.ok) {
                    throw new Error("No se pudo cargar los datos");
                }
                const foundRecipe = await response.json();
                
                if (foundRecipe) {
                    setSelectedRecipe(foundRecipe); // Establecer la receta seleccionada en el estado
                } else {
                    console.log("La receta no fue encontrada.");
                    <p>Receta no encontrada</p>;
                }
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        const fetchComent = async () => {
            try {
                const response = await fetch("http://sandbox.academiadevelopers.com/reciperover/ratings/?page_size=1000");
                if (!response.ok) {
                    throw new Error("No se pudo cargar los datos");
                }
                const datacoment = await response.json(); // Parsear la respuesta a JSON
                const coments = datacoment.results.filter(comment => parseInt(comment.recipe) === parseInt(id));

                //Calcular promedio de rating
                const ratings = coments.map(comment => comment.rating);
                const ratingSum = ratings.reduce((acc, curr) => acc + curr, 0);
                const averageRating = ratingSum / coments.length;
                

                if (coments) {
                    setSelectComents(coments);
                    setAverageRating(averageRating);
                   
                } else {
                    console.log("No se encontraron comentarios para la receta con id:", recipeId);
                }
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        // const handleSubmit = async () =>{
        //     console.log("haz echo clic");
        // }


        fetchData();
        fetchComent();
    //    handleSubmit();
    }, [id]);  // Ejecutar el efecto cada vez que cambia el id

<<<<<<< Updated upstream
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const recipe=id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const comentData = {
                rating,
                comment,
                recipe,
            };
            
            const response = await fetch('https://sandbox.academiadevelopers.com/reciperover/ratings/', {
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
            navigate(`/recetario/${id}`);;  // Redirige a la página principal u otra ruta después de agregar la receta
        } catch (error) {
            console.error('Error al agregar comentario:', error);
        }
    };

=======
>>>>>>> Stashed changes
    // Mostrar un mensaje de carga mientras se obtiene la receta seleccionada
    if (!selectedRecipe) {
        return <p>Cargando...</p>;
    } //else {
        // return <p>Receta no encontrada</p>;
     //}

     const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const recipeData = {
                title,
                description,
                preparation_time: preparationTime,
                cooking_time: cookingTime,
                servings,
            };

            const response = await fetch('https://sandbox.academiadevelopers.com/reciperover/recipes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,  // Incluye el token en la cabecera de autorización
                },
                body: JSON.stringify(recipeData),
            });

            if (!response.ok) throw new Error('Error al agregar la receta');
            
            const result = await response.json();
            console.log("Receta creada:", result);
            navigate("/");  // Redirige a la página principal u otra ruta después de agregar la receta
        } catch (error) {
            console.error('Error al agregar la receta:', error);
        }
    };


return (
    <>
    <div>
        <p>Promedio de los usuarios : {averageRating}</p>
        <FrirstCard recipe = {selectedRecipe}/>
        <SecondCard recipe = {selectedRecipe}/>
        <ThirdCard recipe = {selectedRecipe}/>
       {selectedRecipe.owner == userID?
       ( <button className="button is-primary"  onClick={() => navigate(`/recetario/edit/${selectedRecipe.id}`)}>Editar</button>
       ): null}
       {selectedRecipe.owner == userID?
       ( <button className="button is-primary"  onClick={() => navigate(`/recetario/edit/${selectedRecipe.id}`)}>Eliminar</button>
       ): null}
    </div>
    <div>
<<<<<<< Updated upstream
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
                <input type="submit" value="Enviar" />
            </form>
=======
        <form onSubmit={handleSubmit} className="box">
            <label htmlFor="comentario">Comentario:</label><br />
            <input type="text" id="comentario" name="comentario" /><br />
            <label htmlFor="valoracion">Valoración:</label><br />
            <select id="valoracion" name="valoracion">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select><br />
            {/* <input type="submit" value="Enviar" /> */}
            <button type="submit" className="button is-primary">
                Comentar..
            </button>
        </form>
>>>>>>> Stashed changes
    </div>

    <div>
    <h1>Comentarios:</h1>
<<<<<<< Updated upstream
    {selectComents && selectComents.length > 0 ? (
        selectComents.map((comentario) => (
            <div key={comentario.id} className="column is-one-third">
                <ComentCard comentario={comentario} />
            </div>
        ))
    ) : (
        <p>No hay comentarios disponibles.</p>
    )}
=======
    {selectComents.map((comentario) => (
        <div key={comentario.id} className="column is-one-third">
            <ComentCard comentario={comentario} />
        </div>
    ))}
>>>>>>> Stashed changes
</div>
    </>
);

};

export default Detail;