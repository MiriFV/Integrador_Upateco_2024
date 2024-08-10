import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import IngredienteNew from "../ingredientes/IngredienteNew";

function AddRecipe() {
    const auth = useAuth("state");

    if (!auth || !auth.token) {
        return (
            <div>
                Error: Autenticación no disponible. <br />
                Recuerda que debes estar logeado para subir una receta.
            </div>
        );
    }

    const { token } = auth;
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [preparationTime, setPreparationTime] = useState(0);
    const [cookingTime, setCookingTime] = useState(0);
    const [servings, setServings] = useState(1);
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (ingredients.length === 0) {
            setError("Debes agregar al menos un ingrediente.");
            setLoading(false);
            return;
        }

        try {
            const recipeData = {
                title,
                description,
                preparation_time: parseInt(preparationTime, 10),
                cooking_time: parseInt(cookingTime, 10),
                servings: parseInt(servings, 10),
            };

            const recipeID = await createRecipe(recipeData, token);
            await createAndAssociateIngredients(recipeID, ingredients, token);

            navigate(`/recetario/${recipeID}`);
        } catch (error) {
            console.error('Error al agregar la receta:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {error && <div className="notification is-danger">{error}</div>}
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
                            rows={4}
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
                <IngredienteNew ingredients={ingredients} setIngredients={setIngredients} />
                <div className="field">
                    <div className="control">
                        <button type="submit" className="button is-primary" disabled={loading}>
                            {loading ? 'Guardando...' : 'Agregar Receta'}
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

// Función para crear la receta
const createRecipe = async (recipeData, token) => {
    const response = await fetch('https://sandbox.academiadevelopers.com/reciperover/recipes/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(recipeData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al agregar la receta');
    }

    const resultRecipe = await response.json();
    return resultRecipe.id;
};

// Función para crear y asociar ingredientes con la receta
const createAndAssociateIngredients = async (recipeID, ingredients, token) => {
    const ingredientPromises = ingredients.map(async (ingredient) => {
        const ingredientData = {
            name: ingredient.nameIng,
        };

        const responseIng = await fetch('https://sandbox.academiadevelopers.com/reciperover/ingredients/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(ingredientData),
        });

        if (!responseIng.ok) {
            const errorData = await responseIng.json();
            throw new Error(`Error al crear el ingrediente: ${errorData.message || ingredient.nameIng}`);
        }

        const resultIng = await responseIng.json();
        const ingredientID = resultIng.id;

        const ingredientRecipeData = {
            quantity: parseFloat(ingredient.quantity),
            measure: ingredient.measure,
            recipe: recipeID,
            ingredient: ingredientID,
        };

        const responseAssoc = await fetch('https://sandbox.academiadevelopers.com/reciperover/recipe-ingredients/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(ingredientRecipeData),
        });

        if (!responseAssoc.ok) {
            const errorData = await responseAssoc.json();
            throw new Error(`Error al asociar el ingrediente con la receta: ${errorData.message || ingredient.nameIng}`);
        }
    });

    await Promise.all(ingredientPromises);
};

export default AddRecipe;


