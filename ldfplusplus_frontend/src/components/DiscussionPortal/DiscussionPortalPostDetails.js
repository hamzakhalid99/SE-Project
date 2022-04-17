import React from 'react';
import iconpic from "./Groups.png";
import './DiscussionPortalPostDetails.css'

class DiscussionPortalPostDetails extends React.Component {

    constructor(props) {
        super(props);
        
        // this.state = {
        //     email: '',
        //     password: '',
        // }
    }

	render() {
        const { onRouteChange, post } = this.props;
        console.log(post)
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


            <div className="landinghappening">
                        {/* {posts}*/}
                        <h2>post</h2>
                        <a className="form-green-button-view viewmore" >View More</a>
                </div>

                

            </div>
			
		)
	}
}

export default DiscussionPortalPostDetails;