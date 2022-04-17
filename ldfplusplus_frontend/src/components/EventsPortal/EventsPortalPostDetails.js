import React from 'react';
import fastfood from "./Fastfood.png";
import './EventsPortalPostDetails.css'

class EventsPortal extends React.Component {

    constructor(props) {
        super(props);
        
        // this.state = {
        //     email: '',
        //     password: '',
        // }
    }

	render() {
        const { onRouteChange, post } = this.props;
        // console.log(post)
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


                <div className="landinghappening">
                        <div className="viewpostfood">
                            <h3>{ post.postedby.fullname }</h3>
                            <h2>{ post.date.slice(0, 10) + " " + post.date.slice(11, 19)  }</h2>
                            <h1 > <u> { post.title } </u>  </h1>
                            <h1>{ post.content }</h1>
                            <h1>CONTACT: { post.contact }</h1>
                        </div>

                        
                </div>


                <a className="form-green-button" onClick={() => { onRouteChange('eventsportal') }}>Back</a>

            </div>
			
		)
	}
}

export default EventsPortal;