import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


function AddRecipe() {
    const auth = useAuth("state");
   
    const { token } = auth;
    const navigate = useNavigate();
 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [preparationTime, setPreparationTime] = useState(0);
    const [cookingTime, setCookingTime] = useState(0);
    const [servings, setServings] = useState(1);
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
   
    useEffect(
        () => {
            fetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/ingredients/?page_size=1000`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            "No se puedieron cargar las categorías"
                        );
                    }
                    return response.json();
                })
                .then((data) => {
                    setIngredients(data.results);
                })
                .catch((error) => {
                    console.error("Error al realizar la petición", error);
                })
                //.finally(() => {
                    //return setLoadingCategories(false);
                //});
        },
        [] /*Cuando se monta el componente*/
    );


    function handleListChange(event){
        const selectedOptions = Array.from(
            event.target.selectedOptions,
            (option) => option.value //
        );
        const updatedSelectedIngredients = ingredients.filter((ing)=>
             selectedOptions.includes(String(ing.id))
        );
        setSelectedIngredients(updatedSelectedIngredients);
       


    };


     
    const handleSubmit = async (e) => {
        e.preventDefault();          
        const recipeData = {
            title,
            description,
            preparation_time: preparationTime,
            cooking_time: cookingTime,
            servings,
        };
        console.log(selectedIngredients);
        fetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipes/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(recipeData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Primer fetch");
                }
                return response.json();
            })
            .then((data) => {
               
                selectedIngredients.forEach((ingr) => {
                    fetch(
                        `${import.meta.env.VITE_API_BASE_URL}recipe-ingredients/`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Token ${token}`,
                            },
                            body: JSON.stringify({
                                quantity: 1,
                                measure: "g",
                                recipe: parseInt(data.id),
                                ingredient: parseInt(ingr.id)
                            }),
                        }
                    );
                })
            })
            .catch((error) => {
                console.error("Error error al crear la receta segundo fetch", error);
            })
            .finally(() => {
                    return navigate(`/recetario/${data.id}`);
            });
    };


    return (
        <div>
            <form onSubmit={handleSubmit} className="box" style={styles.form}>
                <h1 className="title">Crear Nueva Receta</h1>
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
                    <label className="label">Ingredientes</label>
                    <div className="select is-fullwidth is-multiple">
                       
                        <select
                            multiple
                            size="5"
                            value={selectedIngredients.map((ing) => ing.id)}
                            onChange={handleListChange}
                       >
                        {ingredients.map((ingredientes) => (
                            <option key={ingredientes.id} value={ingredientes.id}>
                                {ingredientes.name}
                            </option>
                            ))}
                        </select>
                    </div>
                </div>


                <div className="field">
                    <div className="control">
                        <button type="submit" className="button is-primary">
                            Agregar Receta
                        </button>
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


export default AddRecipe;
