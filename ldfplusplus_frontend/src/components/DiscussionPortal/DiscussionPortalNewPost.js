import React from 'react';
import iconpic from "./Groups.png";
import './DiscussionPortalNewPost.css'
import BACKEND_LINK from './../../env.js';

class DiscussionPortalNewPost extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            content: '',
            title: '',
            postedby: '',
            // anonymous: false,
            user_id: this.props.user.user_id
        }
    }

    onTitleChange = (event) => {
        this.setState({ title: event.target.value })
    }

    onDetailsChange = (event) => {
        this.setState({ content: event.target.value })
    }

    onPostedByChange = (event) => {
        this.setState({ postedby: event.target.value })
    }

    onContactChange = (event) => {
        this.setState({ contact: event.target.value })
    }

    onAnonymousChange = (event) => {
        this.setState({ anonymous: event.target.value })
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
                    <img className="iconpic" src={ iconpic } />  
                    </div>

                        <div className="usecasename">
                        <p>Discussion Portal</p>
                        </div>

                </div> 

                
                <div className="post-container">
                    <div>
                        <form className="postform" onSubmit={this.onSubmitPost}>
                            <input className="posttitle" placeholder="Post Title" type="text" onChange={this.onTitleChange} />
                            <input className="posttitle" placeholder="Contact" type="text" onChange={this.onContactChange} />
                            {/*<input className="posttitle" placeholder="Post Anonymously" type="checkbox" onChange={this.onAnonymousChange} />*/}
                            <input className="postdetails" placeholder="Post Details" type="text" onChange={this.onDetailsChange} />
                            
                            
                            <input className="post-green-button" value="Post" type="submit" />
                            <a className="form-red-button" onClick={() => { onRouteChange('discussionportal') }}>Back</a>
                        </form>
                    </div>
                   
                </div>
            </div>
        )
		
	}
}

export default DiscussionPortalNewPost;