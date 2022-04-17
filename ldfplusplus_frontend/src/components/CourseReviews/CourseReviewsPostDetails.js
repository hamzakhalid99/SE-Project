import React from 'react';
import fastfood from "./Fastfood.png";
import './CourseReviewsPostDetails.css'

class CourseReviews extends React.Component {

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
                    <img className="iconpic" src={ fastfood } />  
                    </div>

                        <div className="usecasenameCR">
                        <p>Course Reviews</p>
                        </div>

                </div>


                <div className="landinghappening">
                        <div className="viewpostfood">
                            <h3>{ post.postedby.fullname }</h3>
                            <h2>{ post.date.slice(0, 10) + " " + post.date.slice(11, 19)  }</h2>
                            <h1 > <u> { post.title } </u>  </h1>
                            <h1>{ post.content }</h1>
                            {/* <h1>FROM: { post.areafrom }</h1>
                            <h1>TO: { post.areato }</h1>
                            <h1>COMPENSATION: { post.compensation }</h1>
                            <h1>CONTACT: { post.contact }</h1> */}
                        </div>

                        
                </div>


                <a className="form-green-button" onClick={() => { onRouteChange('coursereviews') }}>Back</a>

            </div>
			
		)
	}
}

export default CourseReviews;