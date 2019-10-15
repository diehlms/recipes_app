import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index'
import CommentForm from '../../Form/Comment/Comment'
import CommentList from '../../List/CommentList'

class Show extends Component {
    componentDidMount() {
        this.props.onFetchRecipes()
        this.props.onFetchComments()
    }

    render() {
    
        let showText = 'Not loaded yet'

        let commentList = 'no comments added yet'
        
        if (!this.props.loading && this.props.comments[1] && this.props.comments[1].comments) {
            let commentList = 
                <CommentList 
                    recipeId={this.props.match.params.id}
                    comments={this.props.comments[1].comments}
                    loading={this.props.loading}
                />
        }

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
                <div>
                    <div>
                        {name}
                        {directions}
                        {ingList}
                        {stars}
                    </div>
                    {commentList}
                    <p>Add comment:</p>
                    <CommentForm 
                        recipeId={this.props.match.params.id}
                        addComment={(comment, id) => this.props.onAddComment(comment, id)}/>
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
        onAddComment: (comment, id) => dispatch(actions.addComment(comment, id)),
        onFetchComments: () => dispatch(actions.fetchComments())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Show)
