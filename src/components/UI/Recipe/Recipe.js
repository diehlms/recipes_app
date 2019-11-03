import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from '../../../firebase'
import './Recipe.css'
import 'firebase/firestore'

export class Recipe extends Component {
    render() {
        const { id, name, directions, ingredient, stars, image } = this.props.recipe;
        const ingList = ingredient.map((ing) => {
            return (
                <li key={ing}>{ing}</li>
            )
        })

        let img = '';

        if (`${image}`.length > 0) {
            img = (
                <img className="recipeGridImage" id={`${image}-img`} alt=''/>
            )
            let storage = firebase.storage();
            let storageRef = storage.refFromURL(`${image}`)
            storageRef.getDownloadURL().then(function(url) {
                var imgInject = document.getElementById(`${image}-img`);
                imgInject.src = url
            })
            
        }

        const addStar = id => {
            const dbRef = firebase.firestore().collection('recipes').doc(`${id}`)
            dbRef.update({stars: firebase.firestore.FieldValue.increment(1)})
        }

        const removeStar = id => {
            // const dbRef = fbDemo.firestore().collection('recipes').doc(`${id}`)
            // dbRef.update("stars", fbDemo.firestore.FieldValue.increment(-1))
        }

        return (
            <div className="indRecipe">
                <p>
                    <Link to={`/recipes/${id}`}>{name}</Link>
                </p>
                <div className="stars">
                    <span>
                        <button onClick={() => addStar(id)}>add star</button>
                            {stars}
                        <button onClick={() => removeStar(id)}>remove star</button>
                    </span>
                </div>
                <div>
                    {img}
                </div>
                <div className="infoCard1">
                    <div>
                        <p>Ingredients:</p>
                        <ul>{ingList}</ul>
                    </div>
                    <div>
                        <p>Directions:</p>
                        <p>{directions}</p>
                    </div>
                </div>
                <button 
                    style={{
                        width: '90%',
                        backgroundColor: 'salmon',
                        color: 'white',
                        padding: '6px',
                        marginBottom: '5px',
                        bottom: '0px',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                    onClick={this.props.delRecipe.bind(this,id)}>
                    delete recipe
                </button>
            </div>
        )
    }
}


export default connect(null, null)(Recipe)