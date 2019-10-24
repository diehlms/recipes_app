import * as actions from './actionTypes';
import firebase from '../../firebase'

const dbRef = firebase.database().ref('recipes')

export const addRecipeInit = () => {
    return {
        type: actions.ADD_RECIPE_INIT
    }
}

export const addRecipeSuccess = newRecipe => {
    return {
        type: actions.ADD_RECIPE_SUCCESS,
        newRecipe
    }
}

export const addRecipeFail = () => {
    return {
        type: actions.ADD_RECIPE_FAIL
    }
}

export const addRecipe = (name, directions, ingredients, imageDownloadUrl) => {
    return dispatch => {
        dispatch(addRecipeInit())
        const newRecipe = {
            name,
            directions,
            ingredients,
            stars: 1,
            imageDownloadUrl
        }
        dbRef.push(newRecipe)
        dispatch(addRecipeSuccess(newRecipe))
    }
}

export const removeRecipe = id => {
    const dbRefInd = firebase.database().ref(`recipes/${id}`)
    dbRefInd.remove();
    return {
        type: actions.REMOVE_RECIPE
    }
}

export const fetchRecipesFail = err => {
    return {
        type: actions.FETCH_RECIPES_FAIL,
        err
    }
}

export const fetchRecipesSuccess = recipesArr => {
    return {
        type: actions.FETCH_RECIPES_SUCCESS,
        recipesArr
    }
}

export const fetchRecipesStart = () => {
    return {
        type: actions.FETCH_RECIPES_START
    }
}

export const fetchRecipes = () => {
    return dispatch => {
        dispatch(fetchRecipesStart())
        dbRef.on('value', (snapshot) => {
            let recipes = snapshot.val();
            let recipesArr = [];
            for (let recipe in recipes) {
                recipesArr.push({
                    id: recipe,
                    name: recipes[recipe].name,
                    directions: recipes[recipe].name,
                    ingredient: recipes[recipe].ingredients,
                    image: recipes[recipe].imageDownloadUrl,
                    stars: recipes[recipe].stars
                })
            }
            dispatch(fetchRecipesSuccess([recipesArr]))
        })
    }
}

export const addStar = id => {
    const increment = firebase.firestore.FieldValue.increment(1)
    var db = firebase.firestore()
    var dbRefInd = db.collection('recipes').doc(id)
    dbRefInd.update({stars: increment})
    return {
        type: actions.ADD_STAR
    }
}

export const removeStar = id => {
    const decrement = firebase.firestore.FieldValue.increment(-1)
    var db = firebase.firestore()
    var dbRefInd = db.collection('recipes').doc(id)
    dbRefInd.update({stars: decrement})
    return {
        type: actions.REMOVE_STAR
    }
}