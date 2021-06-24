import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {
    state = {
        username: '',
        password: ''
    };

    onTitleChange = e => {
        this.setState({
            username: e.target.value
        });
    };

    onBodyChange = e => {
        this.setState({
            password: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        };
        axios
            .post('https:api.scifanchain.com/token/', data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="post">
                <form className="post" onSubmit={this.handleSubmit}>
                    <input
                        placeholder="Title" value={this.state.username}
                        onChange={this.onTitleChange} required
                    />
                    <textarea
                        placeholder="Body" value={this.state.password}
                        onChange={this.onBodyChange} required
                    />
                    <button type="submit">Create Post</button>
                </form>
            </div>
        );
    }
}

export default Post;