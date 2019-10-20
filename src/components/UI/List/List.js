import React, { Component } from 'react'
import Recipe from '../Recipe/Recipe'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import './List.css'

export class List extends Component {
    
    render() {
        return this.props.recipes.map((recipe) => (
            <div>
                <Recipe
                    key={recipe.id}
                    recipe={recipe}
                    delRecipe={id => this.props.onDeleteRecipe(id)}
                />
            </div>
            )
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteRecipe: id => dispatch(actions.removeRecipe(id))
    }
}
export default connect(null, mapDispatchToProps)(List)

