import useFetch from "../../hooks/useFetch"
import RecetaItem from "./RecetaItem";

function RecetaList() {
    const [recetasData, isError, isLoading] = useFetch("https://sandbox.academiadevelopers.com/reciperover/recipes/");

    if (isLoading) { return <p>Cargando... :D</p> };

    if (isError) { return <p>Error a cargar recetas... :c</p> };
    
    const recetas = recetasData.results; 
    if (!recetas || recetas.length === 0) { return <p>No existen recetas disponibles</p> };
    console.log('Recetas:', recetas);
    return (
        <div className="product-list">
            <h2>Todas las recetas</h2>
            
                {
                    recetas.map((receta) => (
                        <div key={receta.id}>
                            <RecetaItem receta={receta}
                                onAddFavorite={() => onAddFavorite(receta)}
                            /></div>
                    ))
                }
        </div >

    );
}
export default RecetaList;