import React from 'react';
import careerhelp from "./Careerhelp.png";
import './CareerhelpPostDetails.css'

class Careerhelp extends React.Component {

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
                    <img className="iconpic" src={ careerhelp } />  
                    </div>

                        <div className="usecasename">
                        <p>Career Help</p>
                        </div>

                </div>


                <div className="landinghappening">
                        <div className="viewpostfood">
                            <h3>{ post.postedby.fullname }</h3>
                            <h2>{ post.date.slice(0, 10) + " " + post.date.slice(11, 19)  }</h2>
                            <h1 > <u> { post.title } </u>  </h1>
                            <h1>{ post.content }</h1>
                            <h1>Salary: { post.salary }</h1>
                            <h1>Location: { post.location }</h1>
                        </div>

                        
                </div>


                <a className="form-green-button" onClick={() => { onRouteChange('careerhelp') }}>Back</a>

            </div>
			
		)
	}
}

export default Careerhelp;