import React from 'react';
import fastfood from "./Fastfood.png";
import './EventsPortalNewPost.css'
import BACKEND_LINK from './../../env.js';

class EventsPortalNewPost extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            content: '',
            title: '',
            contact: '',
            interested: '',
            going: '',
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

    onInterestedChange = (event) => {
        this.setState({ interested: event.target.value })
    }

    onGoingChange = (event) => {
        this.setState({ going: event.target.value })
    }


    onSubmitPost = (event) => {
        event.preventDefault()
		fetch(BACKEND_LINK+'/events/post', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.state)
		})
		.then(response => response.json())
		.then(user => {	
            console.log(user)
			this.props.onRouteChange('eventsportal')
			
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

                        <div className="usecasename">
                        <p>Events</p>
                        </div>

                </div> 

                
                <div className="post-container">
                    <div>
                        <form className="postform" onSubmit={this.onSubmitPost}>
                            <input className="posttitle" placeholder="Post Title" type="text" onChange={this.onTitleChange} />
                            <input className="posttitle" placeholder="Contact" type="text" onChange={this.onContactChange} />
                            {/* <input className="posttitle" placeholder="Interested (Yes/No)" type="text" onChange={this.onInterestedChange} />
                            <input className="posttitle" placeholder="Going (Yes/No)" type="text" onChange={this.onGoingChange} /> */}
                            <input className="postdetails" placeholder="Post Details" type="text" onChange={this.onDetailsChange} />
                            
                            <input className="post-green-button" value="Post" type="submit" />
                            <a className="form-red-button" onClick={() => { onRouteChange('eventsportal') }}>Back</a>
                        </form>
                    </div>
                   
                </div>
            </div>
        )
		
	}
}

export default EventsPortalNewPost;