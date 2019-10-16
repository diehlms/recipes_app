import * as actions from '../actions/actionTypes'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.AUTH_START: {
            return [
                state, {
                    error: null,
                    loading: true
                }
            ]
        }
        case actions.AUTH_FAIL: {
            console.log(action.err)
            return [
                state, {
                    error: action.err,
                    loading: false
                }
            ]
        }
        case actions.AUTH_SUCCESS: {
            return [
                state, {
                    token: action.idToken,
                    userId: action.userId,
                    error: null,
                    loading: false
                }
            ]
        }
        case actions.SET_AUTH_REDIRECT: {
            return [
                state, {
                    authRedirectPath: action.path
                }
            ]
        }
        case actions.AUTH_LOGOUT: {
            return [
                state, {
                    token: null,
                    userId: null
                }
            ]
        }
        default: return state
    }
}

export default authReducer