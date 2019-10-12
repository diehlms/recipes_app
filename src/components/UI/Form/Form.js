import React, { Component } from 'react'
import Ingredients from './Ingredients/Ingredients'
import './Form.css'
import { connect } from 'react-redux' 
import * as actions from '../../../store/actions/index'

export class Form extends Component {
    state = {
        name: '',
        directions: '',
        ingredients: ['']
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAddRecipe(this.state.name, this.state.directions, this.state.ingredients)
        this.setState({
            name: '',
            directions: '',
            ingredients: [""]
        })
    }

    onIngChange = (e, index) => {
        this.state.ingredients[index] = e.target.value
        this.setState({
            ingredients: this.state.ingredients
        })
    }

    addIngredient = (e) => {
        e.preventDefault();
        this.setState({ingredients: [...this.state.ingredients, ""]})
    }
    
    render() {
        return (
            <div className="Form">
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Name of Recipe:</label>
                        <br/>
                        <input 
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}/>
                    </div>
                    <div>
                        <Ingredients 
                            ingredients={this.state.ingredients}
                            onIngChange={(e, index) => this.onIngChange(e, index)}
                            addIngredient={this.addIngredient}
                        />
                    </div>
                    <div>
                        <label>Directions:</label>
                        <br/>
                        <textarea
                            rows="5"
                            type="text"
                            name="directions"
                            value={this.state.directions}
                            onChange={this.onChange} />
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddRecipe: (name, directions, ingredients) => dispatch(actions.addRecipe(name, directions, ingredients))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

