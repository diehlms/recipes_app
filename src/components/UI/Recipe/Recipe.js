import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import { throwStatement } from '@babel/types';
import './Recipe.css'

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
            <div className="indRecipe">
                <div className="infoCard1">
                    <p><Link 
                        to={`/recipes/${id}`}>
                        {name}
                    </Link></p>
                    <div className="stars">
                        <span>
                            <button onClick={() => addStar(id)}>add star</button>
                            {stars}
                            <button onClick={() => removeStar(id)}>remove star</button>
                        </span>
                    </div>
                    <ul>{ingList}</ul>
                    <button onClick={this.props.delRecipe.bind(this,id)}>delete recipe</button>
                </div>
                <div className="directions">
                    {directions}
                </div>
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
