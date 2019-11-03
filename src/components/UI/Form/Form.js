import React, { Component } from 'react'
import Ingredients from './Ingredients/Ingredients'
import './Form.css'
import { connect } from 'react-redux' 
import * as actions from '../../../store/actions/index'
import firebase from '../../../firebase'
import Modal from 'react-modal'

export class Form extends Component {
    state = {
        name: '',
        directions: '',
        ingredients: [''],
        imageDownloadUrl: '',
        image: null,
        loading: false,
        modalIsOpen: false
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value })
    }

    imageSubmitHandler = () => {
        let storageRef = firebase.storage().ref('recipes');
        if (this.state.image) {
            let uploadTask = storageRef.put(this.state.image);
            uploadTask.on('state_changed', snapshot => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done')
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload paused')
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload running')
                        break;
                    default:
                        return
                    }

                }, function(error) {
                    console.log(error)
                }, () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log(downloadURL)
                        this.setState({
                            imageDownloadUrl: downloadURL
                        })
                        this.props.onAddRecipe(this.state.name, this.state.directions, this.state.ingredients, this.state.imageDownloadUrl)
                        this.setState({
                            name: '',
                            ingredients: [''],
                            image: null,
                            imageDownloadUrl: '',
                            directions: ''
                        })
                    })
                })
            }
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.image !== null) {
            this.imageSubmitHandler()
        } else {
            this.props.onAddRecipe(this.state.name, this.state.directions, this.state.ingredients, this.state.imageDownloadUrl )
            this.setState({
                name: '',
                ingredients: [''],
                image: null,
                imageDownloadUrl: '',
                directions: ''
            })
        }
    }

    onIngChange = (e, index) => {
        this.state.ingredients[index] = e.target.value
        this.setState({
            ingredients: this.state.ingredients
        })
    }

    onImageChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0]
            this.setState({image: image})
        }
    }

    addIngredient = (e) => {
        e.preventDefault();
        this.setState({ingredients: [...this.state.ingredients, ""]})
    }

    removeIngredient = index => {
        this.state.ingredients.splice(index, 1)
    }

    openModal() {
        this.setState({modalIsOpen: true})
    }

    closeModal() {
        this.setState({modalIsOpen: false})
    }
    
    render() {
        return (
            <div>
                <button 
                        onClick={() => this.openModal()}
                        className="addrecipebutton"
                        >add a recipe
                </button>
                <div className="recipeform">
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={() => this.closeModal()}
                        ariaHideApp={false}
                    >
                        <h5>Add a recipe:</h5>
                        <form onSubmit={this.onSubmit}>
                            <label>Name of Recipe:</label>
                            <input 
                                type="text"
                                name="name"
                                placeholder="title of recipe"
                                value={this.state.name}
                                onChange={this.onChange}/>

                            <label>Ingredients:</label>
                            <Ingredients 
                                ingredients={this.state.ingredients}
                                onIngChange={(e, index) => this.onIngChange(e, index)}
                                removeIngredient={(index) => this.removeIngredient(index)}
                                addIngredient={this.addIngredient}
                            />
                            <label>Directions:</label>
                            <textarea
                                rows="5"
                                type="text"
                                name="directions"
                                placeholder="directions"
                                value={this.state.directions}
                                onChange={this.onChange} />
                            <label>Image:</label>
                            <input
                                type="file"
                                onChange={this.onImageChange} />
                            <input type="submit" value="Submit" />
                        </form>
                    </Modal>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAddRecipe: (name, directions, ingredients, imageDownloadUrl) => dispatch(actions.addRecipe(name, directions, ingredients, imageDownloadUrl))
    }
}

export default connect(null, mapDispatchToProps)(Form)

