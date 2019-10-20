import React, { Component } from 'react'

export class Ingredients extends Component {
    render() {
        const ingredients = this.props.ingredients.map((ing, index) => {
            return (
                <div key={index}>
                    <input 
                        type="text"
                        name="ingredient"
                        placeholder="ingredient"
                        value={ing}
                        onChange={(e) => this.props.onIngChange(e, index)}
                    />
                    <button
                        onClick={(index) => this.props.removeIngredient(index)}
                    >-</button>
                    <button
                        onClick={this.props.addIngredient}
                    >+</button>
                </div>
            )
        })
        return (
            <div>
                {ingredients}
            </div>
        )
    }
}

export default Ingredients