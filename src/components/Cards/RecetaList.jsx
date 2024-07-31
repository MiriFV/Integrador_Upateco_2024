import { RecetaItem } from "./RecetaItem";
 
function RecetaList({recetas,onAddFavorite}){
    return(
        <div className="product-list">
            {recetas.map((receta,index)=>(
                <RecetaItem receta ={receta} 
                onAddFavorite={()=>onAddFavorite(receta)} 
                key = {index}/>
            ))}
        </div>

    );
}
export default RecetaList;