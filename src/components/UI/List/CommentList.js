import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'

class CommentList extends Component {
    componentDidMount() {
        this.props.onFetchComments()
    }
    
    render() {
        let comments = 'no comments added yet'
        let commentList = []

        if (!this.props.loading && this.props.comments[1] && this.props.comments[1].comments) {
            this.props.comments[1].comments.map(indComment => {
                if (indComment.recipeId == this.props.recipeId) {
                    commentList.push(indComment.comment)
                }
            })

        }

        if (commentList.length > 0) {
            comments = commentList.map(indComment => {
                return (
                    <li>{indComment}</li>
                )
            })
        }

        return (
            <div>
                <p>Comments:</p>
                <ul>
                    {comments}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.comments.loading,
        comments: state.comments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchComments: () => dispatch(actions.fetchComments())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)