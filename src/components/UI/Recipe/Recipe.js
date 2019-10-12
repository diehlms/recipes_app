import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import { throwStatement } from '@babel/types';

export class Recipe extends Component {
    
    render() {
        const { id, name, directions, ingredient, stars } = this.props.recipe;
        const ingList = ingredient.map((ing) => {
            return (
                <li>{ing}</li>
            )
        })

        const addStar = id => {
            this.props.onAddStar(id)
        }

        const removeStar = id => {
            this.props.onRemoveStar(id)
        }

        return (
            <div>
                <h1><Link 
                    to={`/recipes/${id}`}>
                    {name}
                </Link></h1>
                <p>{directions}</p>
                <div>
                    <button onClick={() => addStar(id)}>-</button>
                    <p>{stars}</p>
                    <button onClick={() => removeStar(id)}>+</button>
                </div>
                <ul>{ingList}</ul>
                <button onClick={this.props.delRecipe.bind(this,id)}>X</button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddStar: id => dispatch(actions.addStar(id)),
        onRemoveStar: id => dispatch(actions.removeStar(id))
    }
}
export default connect(null, mapDispatchToProps)(Recipe)
