import * as actions from '../actions/actionTypes'

const initialState = {
    recipes: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.ADD_RECIPE_INIT: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.ADD_RECIPE_SUCCESS: {
            return [
                ...state, {
                    loading: false
                }
            ]
        }
        case actions.FETCH_RECIPES_START: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.FETCH_RECIPES_SUCCESS: {
            return [
                state, {
                    loading: false,
                    recipes: action.recipesArr
                }
            ]
        }
        case actions.FETCH_RECIPES_FAIL: {
            return [
                state, {
                    loading: false
                }
            ]
        }
        case actions.REMOVE_RECIPE: {
            return {
                ...state
            }
        }
        case actions.ADD_STAR: {
            return {
                ...state
            }
        }
        case actions.REMOVE_STAR: {
            return {
                ...state
            }
        }
        default: return state
    }
}