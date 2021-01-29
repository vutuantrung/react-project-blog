import axios from '../../../axios';
import React, { Component } from 'react';

import './NewPost.css';
import { Redirect } from 'react-router';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        error: false,
        submitted: false,
    };

    postDataHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.body,
            author: this.state.author,
        };

        axios
            .post('/posts', data)
            .then(res => {
                if (res.status === 201) alert('Success.');
                //this.setState({ submitted: true });
            })
            .catch(err => {
                this.setState({ error: true });
                console.log(err);
            })
            .finally(() => {
                // with push we can go back to the previous page in history stack
                // this.props.history.push('/posts'); ->new-post -> posts, then go back -> new-post

                // This code will replace history stack
                // new-post then new-post gonna be replaced by post, so we cannot go back
                this.props.history.replace('/posts');
            });
    };

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        let redirect = null;
        if (this.state.submitted) {
            redirect = <Redirect to="posts" />;
        }
        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input
                    type="text"
                    value={this.state.title}
                    onChange={event => this.setState({ title: event.target.value })}
                />
                <label>Content</label>
                <textarea
                    rows="4"
                    value={this.state.content}
                    onChange={event => this.setState({ content: event.target.value })}
                />
                <label>Author</label>
                <select
                    value={this.state.author}
                    onChange={event => this.setState({ author: event.target.value })}
                >
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;
