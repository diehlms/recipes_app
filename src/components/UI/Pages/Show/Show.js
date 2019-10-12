import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index'

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
                <div>
                    {name}
                    {directions}
                    {ingList}
                    {stars}
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
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchRecipes: () => dispatch(actions.fetchRecipes())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Show)
