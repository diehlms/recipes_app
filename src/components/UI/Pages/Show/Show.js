import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index'
import CommentForm from '../../Form/Comment/Comment'
import CommentList from '../../List/CommentList'
import './Show.css'

class Show extends Component {
    componentDidMount() {
        this.props.onFetchRecipes()
    }

    render() {
    
        let showText = 'Not loaded yet'

        if (!this.props.loading && this.props.recipes[1] && this.props.recipes[1].recipes) {
            const {name, directions, ingredient, stars } = this.props.recipes[1].recipes[0].find(recipe => 
                recipe.id === this.props.match.params.id
            )
            const ingList = ingredient.map(indIng => {
                return (
                    <li>{indIng}</li>
                )
            })

            return showText = (
                <div className="recipeShow">
                    <div>
                        <h4>{name}</h4>
                        <button>-</button>
                            {stars}
                        <button>+</button>
                        <p>Directions:</p>
                        <p>{directions}</p>
                        <p>Ingredients:</p>
                        <ul>
                            {ingList}
                        </ul>
                    </div>
                    <div>
                    <CommentList 
                        recipeId={this.props.match.params.id}
                    />
                    <p>Add comment:</p>
                    <CommentForm 
                        recipeId={this.props.match.params.id}
                        addComment={(comment, id) => this.props.onAddComment(comment, id)}/> 
                    </div>
                </div>
            )
        }

        return (
            <div>
                <h1>{showText}</h1>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        recipes: state.recipes,
        loading: state.loading,
        comments: state.comments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchRecipes: () => dispatch(actions.fetchRecipes()),
        onAddComment: (comment, id) => dispatch(actions.addComment(comment, id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Show)
