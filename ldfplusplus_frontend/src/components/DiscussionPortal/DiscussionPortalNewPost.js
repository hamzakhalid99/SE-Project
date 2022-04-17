import React from 'react';
import fastfood from "./Fastfood.png";
import './DiscussionPortalNewPost.css'
import BACKEND_LINK from './../../env.js';

class DiscussionNewPost extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            content: '',
            title: '',
            rating: '',
            user_id: this.props.user.user_id
        }
    }

    onTitleChange = (event) => {
        this.setState({ title: event.target.value })
    }

    onRatingChange = (event) => {
        this.setState({ rating: event.target.value })
    }

    onContentChange = (event) => {
        this.setState({ content: event.target.value })
    }

    onSubmitPost = (event) => {
        event.preventDefault()
		fetch(BACKEND_LINK+'/discussionportal/post', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.state)
		})
		.then(response => response.json())
		.then(user => {	
			this.props.onRouteChange('discussionportal')
			
		})
	} 

	render() {

        const { onRouteChange } = this.props;

        return (
            <div>
                <div className="homepage body-center-align">
                    <div className="homepageprofile">
                    <img className="iconpic" src={ fastfood } />  
                    </div>

                        <div className="usecasenameCR">
                        <p>Discussion Portal</p>
                        </div>

                </div> 

                
                <div className="post-container">
                    <div>
                        <form className="postform" onSubmit={this.onSubmitPost}>
                            <input className="posttitle" placeholder="Review Title" type="text" onChange={this.onTitleChange} />
                            <input className="posttitle" placeholder="Rating" type="text" onChange={this.onRatingChange} />
                            <input className="postdetails" placeholder="Content" type="text" onChange={this.onContentChange} />
                            
                            <input className="post-green-button" value="Post" type="submit" />
                            <a className="form-red-button" onClick={() => { onRouteChange('discussionportal') }}>Back</a>
                        </form>
                    </div>
                   
                </div>
            </div>
        )
		
	}
}

export default DiscussionNewPost;