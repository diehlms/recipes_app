import * as actions from '../actions/actionTypes'
import { authRef } from '../../firebase'

const initialState = {
    user: null,
    loading: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.LOGIN_INIT: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.LOGIN_SUCCESS: {
            return [
                state, {
                    user: action.user,
                    loading: false
                }
            ]
        }
        case actions.LOGOUT_INIT: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.LOGOUT_SUCCESS: {
            return [
                state, {
                    user: null,
                    loading: false,
                }
            ]
        }
        case actions.CHECK_AUTH_LOADING: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.CHECK_AUTH_SUCCESS: {
            return [
                state, {
                    user: action.user,
                    loading: false
                }
            ]
        }
        default: return state
    }
}

export default authReducer