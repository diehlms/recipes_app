import * as actions from './actionTypes'
import firebase from '../../firebase'

const dbRef = firebase.database().ref('comments')

export const addComment = (comment, id) => {
    return dispatch => {
        dispatch(addCommentInit())
        const newComment = {
            comment: comment,
            recipeId: id,
        }
        dbRef.push(newComment)
        dispatch(addCommentSuccess())
    }
}

export const addCommentInit = () => {
    return {
        type: actions.ADD_COMMENT_INIT
    }
}

export const addCommentSuccess = () => {
    return {
        type: actions.ADD_COMMENT_SUCCESS
    }
}

export const removeComment = id => {
    return {
        type: actions.REMOVE_COMMENT,
        id
    }
}

export const fetchComments = () => {
    return dispatch => {
        dispatch(fetchCommentsStart())
        dbRef.on('value', (snapshot) => {
            let comments = snapshot.val();
            let commentsArr = [];
            for (let comment in comments) {
                commentsArr.push({
                    id: comment,
                    recipeId: comments[comment].recipeId,
                    comment: comments[comment].comment
                })
            }
            dispatch(fetchCommentsSuccess(commentsArr))
        })
    }
}

export const fetchCommentsSuccess = commentsArr => {
    return {
        type: actions.FETCH_COMMENTS_SUCCESS,
        commentsArr
    }
}

export const fetchCommentsStart = () => {
    return {
        type: actions.FETCH_COMMENTS_START
    }
}