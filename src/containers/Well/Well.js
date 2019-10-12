import React, { Component } from 'react'
import Form from '../../components/UI/Form/Form'
import List from '../../components/UI/List/List'
import { connect } from 'react-redux' 
import * as actions from '../../store/actions/index'
import './Well.css'

export class Well extends Component {
    componentDidMount() {
        this.props.onFetchRecipes()
    }

    render() {
        let recipes = 'No recipes added yet'
        if (!this.props.loading && this.props.recipes[1] && this.props.recipes[1].recipes) {
            recipes = <List recipes={this.props.recipes[1].recipes[0]} />
        }
        return (
            <div className="Well">
                <Form />
                <h1>{recipes}</h1>
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
export default connect(mapStateToProps, mapDispatchToProps)(Well)


