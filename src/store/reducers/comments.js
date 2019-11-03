import * as actions from '../actions/actionTypes'

const initialState = {
    comments: [],
    loading: false
}

const commentReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.ADD_COMMENT_INIT: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.ADD_COMMENT_SUCCESS: {
            return [
                ...state, {
                    loading: false
                }
            ]
        }
        case actions.FETCH_COMMENTS_START: {
            return [
                state, {
                    loading: true
                }
            ]
        }
        case actions.FETCH_COMMENTS_SUCCESS: {
            return [
                state, {
                    comments: action.commentsArr,
                    loading: false
                }
            ]
        }
        case actions.REMOVE_COMMENT: {
            return {
                ...state
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default commentReducer