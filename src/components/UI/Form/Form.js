import React, { Component } from 'react'
import Ingredients from './Ingredients/Ingredients'
import './Form.css'
import { connect } from 'react-redux' 
import * as actions from '../../../store/actions/index'

export class Form extends Component {
    state = {
        name: '',
        directions: '',
        ingredients: [''],
        image: null,
        loading: false
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAddRecipe(this.state.name, this.state.directions, this.state.ingredients, this.state.image)
        this.setState({
            name: '',
            directions: '',
            ingredients: [""],
            image: null,
            loading: false
        })
    }

    onIngChange = (e, index) => {
        this.state.ingredients[index] = e.target.value
        this.setState({
            ingredients: this.state.ingredients
        })
    }

    onImageChange = e => {
        const files = Array.from(e.target.files)
        this.setState({ loading: true })
        const formData = new FormData()
        files.forEach((file, i) => {
            formData.append(i, file)
        })
    }

    addIngredient = (e) => {
        e.preventDefault();
        this.setState({ingredients: [...this.state.ingredients, ""]})
    }
    
    render() {
        return (
            <div className="Form">
                <h5>Add a recipe:</h5>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Name of Recipe:</label>
                        <br/>
                        <input 
                            type="text"
                            name="name"
                            placeholder="title of recipe"
                            value={this.state.name}
                            onChange={this.onChange}/>
                    </div>
                    <div>
                        <label>Ingredients:</label>
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
                            placeholder="directions"
                            value={this.state.directions}
                            onChange={this.onChange} />
                    </div>
                    <div>
                        <label>Directions:</label>
                        <br/>
                        <input
                            type="file"
                            name="image"
                            placeholder="add an image"
                            value={this.state.image}
                            onChange={e => this.onImageChange(e)} />
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
        onAddRecipe: (name, directions, ingredients, image) => dispatch(actions.addRecipe(name, directions, ingredients, image))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)

