import * as actions from './actionTypes'
import firebase, { authRef, provider } from '../../firebase'
import { auth } from 'firebase';

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
        authRef.signout()
        .then(() => {
            dispatch(logoutSuccess())
        })
    }
}

export const logoutSuccess = () => {
    return {
        type: actions.LOGIN_SUCCESS
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
export const checkAuthState = () => {
    return dispatch => {
        dispatch(checkAuthLoading())
        authRef.onAuthStateChanged((user) => {
            if (user) {
                dispatch(checkAuthSuccess(user))
            }
        });
    }
}