import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";

function AddRecipe() {
    const auth = useAuth("state");
    console.log(auth)
    if (!auth) {
        return <div>Error: Auth no está disponible</div>;
    }

    const { token } = auth;
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [preparationTime, setPreparationTime] = useState(0);
    const [cookingTime, setCookingTime] = useState(0);
    const [servings, setServings] = useState(1);

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
