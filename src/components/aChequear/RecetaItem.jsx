function RecetaItem({receta, onAddFavorite}) {
    return (
        <div class="card">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img
                        src={receta.image}
                        alt={receta.title}
                    />
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                            <p>Vistas:
                                <br /> {receta.view_count}
                            </p>
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">{receta.title}</p> 
                        <p class="subtitle is-6">Tiempo de preparacion : {receta.preparation_time}</p>
                    </div>
                </div>

                <div class="content">
                    {receta.description}
                    <br />
                    {/* <time datetime={receta.created_at}></time>*/}
                </div> 
                <div class="content"><button class="button is-info" onClick={onAddFavorite}> ♥ </button></div>
            </div>
        </div>
    
    );
};

export default RecetaItem