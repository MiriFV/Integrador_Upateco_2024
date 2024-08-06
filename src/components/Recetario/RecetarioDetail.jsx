import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const { id } = useParams(); 
    //const id = String(Id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://sandbox.academiadevelopers.com/reciperover/recipes/${id}/`);
                if (!response.ok) {
                    throw new Error("No se pudo cargar los datos");
                }
                const foundRecipe = await response.json();
                
                if (foundRecipe) {
                    setSelectedRecipe(foundRecipe);
                } else {
                    console.log("La receta no fue encontrada.");
                }
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, [id]);

    if (!selectedRecipe) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <h2>{selectedRecipe.title}</h2>
            <img src={selectedRecipe.image} alt={selectedRecipe.title} />
            <p><strong>Descripción:</strong> {selectedRecipe.description}</p>
            <p><strong>Tiempo de preparación:</strong> {selectedRecipe.preparation_time} minutos</p>
            <p><strong>Tiempo de cocción:</strong> {selectedRecipe.cooking_time} minutos</p>
            <h3>Ingredientes:</h3>
            <ul>
                {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
        </div>
    );
   
};

export default Detail;
