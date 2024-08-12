import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function RecetaEdit() {
    //control si tiene sesion iniciada
    const auth = useAuth("state");
    if (!auth) {
        return <div>Error: No iniciaste sesion</div>;
    }
    //Buscamos id de la receta
    const [recipe, setSelectedRecipe] = useState(null);
    const { token, userID } = auth;
    console.log(typeof userID)
    const { id } = useParams();
    const navigate = useNavigate();
    //datos para actualizar la receta
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [preparationTime, setPreparationTime] = useState(0);
    const [cookingTime, setCookingTime] = useState(0);
    const [servings, setServings] = useState(1);
    const [image, setImage] = useState(""); 
    //datos para precargar lo anterior
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://sandbox.academiadevelopers.com/reciperover/recipes/${id}/`);
                if (!response.ok) {
                    throw new Error("No se pudo cargar los datos");
                }
                const recipe = await response.json();
                console.log(typeof recipe.owner)
                //control para ser editado solo por el usuario, pero no recibimos userID al iniciar sesion

                 if (recipe.owner !== Number(userID)) {
                      alert("no eres dueño de esta receta >:c");
                    return navigate(-1);
                   // Redirige si el usuario no es el creador
                 }

                
                setSelectedRecipe(recipe);
                setTitle(recipe.title);
                setDescription(recipe.description);
                setPreparationTime(recipe.preparation_time);
                setCookingTime(recipe.cooking_time);
                setServings(recipe.servings);
                setImage(recipe.image);

            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, [id, navigate, userID]);

    if (!recipe) {
        return <p>Cargando...</p>;
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const recipeData = {
                title,
                description,
                preparation_time: preparationTime,
                cooking_time: cookingTime,
                servings,image,
            };
            console.log(recipeData)

            const response = await fetch(`https://sandbox.academiadevelopers.com/reciperover/recipes/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,  
                },
                body: JSON.stringify(recipeData),
            });

            if (!response.ok) throw new Error('Error al editar la receta');
            
            const result = await response.json();
            console.log("Receta editada:", result);
            navigate(`/recetario/${id}`);  // Redirige a la página de la receta
        } catch (error) {
            console.error('Error al editar la receta:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="box" style={styles.form}>
                <h1 className="title">Editar Receta</h1>
                <div className="field">
                    <label className="label">Título</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Título de la receta"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            maxLength={255}
                            minLength={1}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Descripción</label>
                    <div className="control">
                        <textarea
                            className="textarea"
                            placeholder="Descripción de la receta"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="field">
                    {/* <label className="label">Imagen</label>
                    <div className="control">
                        <textarea
                            className="textarea"
                            placeholder="Imagen de la receta"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div> */}
                </div>
                <div className="field">
                    <label className="label">Tiempo de preparación (minutos)</label>
                    <div className="control">
                        <input
                            className="input"
                            type="number"
                            placeholder="Tiempo de preparación"
                            value={preparationTime}
                            onChange={(e) => setPreparationTime(e.target.value)}
                            required
                            min={0}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Tiempo de cocción (minutos)</label>
                    <div className="control">
                        <input
                            className="input"
                            type="number"
                            placeholder="Tiempo de cocción"
                            value={cookingTime}
                            onChange={(e) => setCookingTime(e.target.value)}
                            required
                            min={0}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Porciones</label>
                    <div className="control">
                        <input
                            className="input"
                            type="number"
                            placeholder="Porciones"
                            value={servings}
                            onChange={(e) => setServings(e.target.value)}
                            min={1}
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button type="submit" className="button is-primary">
                            Editar Receta
                        </button>

                        <button  className="button is-danger" onClick={() => navigate(-1)}>Cancelar</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

const styles = {
    form: {
        maxWidth: '600px',
        margin: '0 auto',
    },
};

export default RecetaEdit;
