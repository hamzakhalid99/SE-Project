import React from 'react';
import fastfood from "./Fastfood.png";
import './FoodDeliveryNewPost.css'

class FoodDeliveryNewPost extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            postTitle: '',
            postDetails: ''
        }
    }

    onTitleChange = (event) => {
        this.setState({ postTitle: event.target.value })
    }

    onDetailsChange = (event) => {
        this.setState({ postDetails: event.target.value })
    }

    onSubmitPost = (event) => {
        event.preventDefault()
		fetch('http://localhost:3000/newpost', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.state)
		})
		.then(response => response.json())
		.then(user => {	
			this.props.onRouteChange('fooddelivery')
			
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
                        <p>Food Delivery</p>
                        </div>

                </div> 
                <div className="post-container">
                    <div>
                        <form className="postform" onSubmit={this.onSubmitPost}>
                            <input className="posttitle" placeholder="Post Title" type="text" onChange={this.onTitleChange} />
                            <input className="postdetails" placeholder="Post Details" type="text" onChange={this.onDetailsChange} />
                            
                            <input className="post-green-button" value="Post" type="submit" />
                        </form>
                    </div>
                   
                </div>
            </div>
        )
		
	}
}

export default FoodDeliveryNewPost;