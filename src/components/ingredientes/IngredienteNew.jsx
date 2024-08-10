import { useState } from "react";

function IngredienteNew({ ingredients, setIngredients }) {
    const [newIngredient, setNewIngredient] = useState({
        quantity: '',
        measure: '',
        nameIng: '',
    });

    const handleChange = (e) => {
        setNewIngredient({
            ...newIngredient,
            [e.target.name]: e.target.value
        });
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { ...newIngredient, id: Date.now() }]);
        setNewIngredient({ quantity: '', measure: '', nameIng: '' });
    };

    return (
        <div>
            <h3>Añadir Ingrediente</h3>
            <div>
                <input
                    type="number"
                    name="quantity"
                    value={newIngredient.quantity}
                    onChange={handleChange}
                    placeholder="Cantidad"
                />
                <input
                    type="text"
                    name="measure"
                    value={newIngredient.measure}
                    onChange={handleChange}
                    placeholder="Unidad"
                />
                <input
                    type="text"
                    name="nameIng"
                    value={newIngredient.nameIng}
                    onChange={handleChange}
                    placeholder="Ingrediente"
                />
                <div
                    type="button"
                    className="is-primary"
                    onClick={handleAddIngredient}
                    style={styles.div}
                >
                    Añadir
                </div>
            </div>

            <h4>Ingredientes actuales:</h4>
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient.quantity} {ingredient.measure} de {ingredient.nameIng}
                    </li>
                ))}
            </ul>
        </div>
    );
}

const styles = {
    div: {
        backgroundColor: '#4CAF50',
        border: 'none',
        color: 'white',
        padding: '15px 32px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer',
    }
};

export default IngredienteNew;