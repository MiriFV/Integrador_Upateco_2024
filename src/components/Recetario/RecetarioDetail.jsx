import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importar useParams y useNavigate
import { useAuth } from "../../contexts/AuthContext";
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


const ComentCard = ({ comentario }) =>{
    const { updated_at, comment, rating } = comentario;

    return (
        <div className="card">
            <div className="card-content">
                <p><strong>Fecha de actualización:</strong> {updated_at}</p>
                <p><strong>Comentario:</strong> {comment}</p>
                <p><strong>Rating:</strong> {rating}</p>
            </div>
        </div>
    );
};

const Detail = () => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);  // Estado para almacenar la receta seleccionada
    const { id } = useParams();  // Obtener el id de la receta de los parámetros de la URL
    const [selectComents, setSelectComents] = useState(null);
    const [averageRating, setAverageRating] = useState(0);
    const [formData, setFormData] = useState({ rating: 0, comment: '', recipe: parseInt(id) });
    const auth = useAuth("state");
    
    const { userID } = useAuth("state");
        
    useEffect(() => {
        const fetchData = async () => {
            // Función para obtener los datos de las recetas desde la API
            try {
                const response = await fetch("https://sandbox.academiadevelopers.com/reciperover/recipes/?page_size=100");
                if (!response.ok) {
                    throw new Error("No se pudo cargar los datos");
                }
                const data = await response.json(); // Parsear la respuesta a JSON
                const results = data.results; // Obtener la lista de recetas
                
                // Buscar la receta seleccionada por id
                const foundRecipe = results.find(recipe => parseInt(recipe.id) === parseInt(id));
                
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Aquí puedes enviar los datos al backend o hacer lo que necesites con la estructura {rating, comment}
        
    };

    // Mostrar un mensaje de carga mientras se obtiene la receta seleccionada
    if (!selectedRecipe) {
        return <p>Cargando...</p>;
    } //else {
        // return <p>Receta no encontrada</p>;
     //}

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
            <form onSubmit={handleSubmit}>
                <label htmlFor="comentario">Comentario:</label><br />
                <input type="text" id="comentario" name="comment" onChange={handleChange} /><br />
                <label htmlFor="valoracion">Valoración:</label><br />
                <select id="valoracion" name="rating" onChange={handleChange}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select><br />
                <input type="submit" value="Enviar" />
            </form>
    </div>

    <div>
    <h1>Comentarios:</h1>
    {selectComents.map((comentario) => (
        <div key={comentario.id} className="column is-one-third">
            <ComentCard comentario={comentario} />
        </div>
    ))}
    </div>
    </>
);

};

export default Detail;
//onSubmit={handleSubmit}