import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import { throwStatement } from '@babel/types';
import firebase from '../../../firebase'
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
            const increment = firebase.firestore.FieldValue.increment(1)
            var db = firebase.firestore()
            var dbRefInd = db.collection('recipes').doc(id)
            dbRefInd.update({stars: increment})
        }

        const removeStar = id => {
            const decrement = firebase.firestore.FieldValue.increment(-1)
            var db = firebase.firestore()
            var dbRefInd = db.collection('recipes').doc(id)
            dbRefInd.update({stars: decrement})
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
                <div className="infoCard1">
                    <div>
                        <p>Ingredients:</p>
                        <ul>{ingList}</ul>
                    </div>
                    <div className="directions">
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
                        bottom: '0',
                        border: 'none',
                        cursor: 'pointer'
                    
                    }}
                    onClick={id => this.props.delRecipe(id)}>
                    delete recipe
                </button>
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
