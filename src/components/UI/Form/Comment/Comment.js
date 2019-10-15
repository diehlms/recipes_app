import React, { Component } from 'react'

export class Comment extends Component {
    state = {
        comment: ''
    }

    render() {

        const submitHandler = e => {
            e.preventDefault();
            this.props.addComment(this.state.comment, this.props.recipeId)
        }

        const changeHandler = e => {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

        return (
            <div>
                <form onSubmit={submitHandler}>
                    <input 
                        type="text"
                        name="comment"
                        onChange={changeHandler}
                        value={this.state.comment}
                        placeholder="comment"/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

export default Comment
