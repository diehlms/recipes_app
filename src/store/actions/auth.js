import * as actions from './actionTypes'
import { authRef, provider } from '../../firebase'

export const loginInit = () => {
    return {
        type: actions.LOGIN_INIT
    }
}

export const login = () => {
    return dispatch => {
        dispatch(loginInit())
        authRef.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                dispatch(loginSuccess(user))
            })
            .catch((err) => {
                dispatch(loginFail(err))
            })
    }
}

export const loginSuccess = user => {
    return {
        type: actions.LOGIN_SUCCESS,
        user
    }
}

export const loginFail = err => {
    return {
        type: actions.LOGIN_FAIL,
        err
    }
}

export const logoutInit = () => {
    return {
        type: actions.LOGOUT_INIT
    }
}

export const logout = () => {
    return dispatch => {
        dispatch(logoutInit())
        authRef.signOut()
        .then(() => {
            dispatch(logoutSuccess('/'))
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const logoutSuccess = path => {
    return {
        type: actions.LOGIN_SUCCESS,
        path
    }
}

export const checkAuthLoading = () => {
    return {
        type: actions.CHECK_AUTH_LOADING
    }
}

export const checkAuthSuccess = user => {
    return {
        type: actions.CHECK_AUTH_SUCCESS,
        user
    }
}

export const checkAuthFail = () => {
    return {
        type: actions.CHECK_AUTH_FAIL
    }
}

export const checkAuthState = () => {
    return dispatch => {
        dispatch(checkAuthLoading())
        authRef.onAuthStateChanged((user) => {
            if (user) {
                dispatch(checkAuthSuccess(user))
            } else {
                dispatch(checkAuthFail())
            }
        });
    }
}