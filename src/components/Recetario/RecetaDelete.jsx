import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function RecetaDelete() {
    //control si tiene sesion iniciada
    const auth = useAuth("state");
    if (!auth) {
        return <div>Error: No iniciaste sesion</div>;
    }
    //Buscamos id de la receta
    const [recipe, setSelectedRecipe] = useState(null);
    const { token, userID } = auth;
    const { id } = useParams();
    const navigate = useNavigate();
    //datos para actualizar la receta
    const [title, setTitle] = useState("");
    //datos para precargar lo anterior
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipes/${id}/`);
                if (!response.ok) {
                    throw new Error("No se pudo cargar los datos");
                }
                const recipe = await response.json();

                //control para ser editado solo por el usuario, pero no recibimos userID al iniciar sesion

                if (recipe.owner !== Number(userID)) {
                    alert("no eres dueño de esta receta >:c");
                    return navigate("/");
                    // Redirige si el usuario no es el creador
                 }

                
                setSelectedRecipe(recipe);
                setTitle(recipe.title);

            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, [id, navigate, userID]);

    if (!recipe) {
        return <p>Cargando...</p>;
    }



    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}reciperover/recipes/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${token}`,  
                },
            });

            if (!response.ok) throw new Error('Error al eliminar la receta');
            
            console.log("Receta eliminada");
            alert("Receta eliminada");
            navigate(`/recetario/`);  // Redirige a recetario
        } catch (error) {
            console.error('Error al eliminar la receta:', error);
        }
    };

    return (
        <div>
            <div className="field">
            <h2>Estas seguro de querer eliminar {recipe.title}?</h2>
            <p>Nos gusta mucho esta receta y la extrañaremos...</p></div>
            <div className="field">
                    <div className="control">
                        <button onClick={handleDelete} className="button is-danger">
                            Eliminar Receta
                        </button>

                        <button  className="button is-primary" onClick={() => navigate(-1)}>Cancelar</button>
                    </div>
                </div>
        </div>
    );
}

const styles = {
    form: {
        maxWidth: '600px',
        margin: '0 auto',
    },
};

export default RecetaDelete;
