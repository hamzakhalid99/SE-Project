import React from 'react';
import fastfood from "./Fastfood.png";
import './FoodDeliveryNewPost.css'

class FoodDeliveryNewPost extends React.Component {

    constructor(props) {
        super(props);
        
        // this.state = {
        //     email: '',
        //     password: '',
        // }
    }

	render() {

		const studentName = "Zafir Ansari"
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

                <div className="landinghappening">
                    <div className="posttitle">
                        <h1> Post Title</h1>
                    </div>
                        
                </div>

                <div className="postdetailsbox">

                    <div className="postdetails">
                        <h1>Post Details</h1>
                    </div>
                        
                </div>


                <a className="form-green-button" onClick={() => { onRouteChange('fooddelivery') }}>Post</a>

            </div>
            
			
		)
		
	}
}

export default FoodDeliveryNewPost;