import React from 'react'

export default function CommentList(props) {
    let comments = 'no comments added yet'
    let commentList = []

    props.comments[0].map(indComment => {
        if (indComment.recipeId == props.recipeId) {
            commentList.push(indComment.comment)
        }
    })

    comments = commentList.map(indComment => {
        return (
            <li>{indComment}</li>
        )
    })

    return (
        <div>
            <p>Comments:</p>
            <ul>
                {comments}
            </ul>
        </div>
    )
}