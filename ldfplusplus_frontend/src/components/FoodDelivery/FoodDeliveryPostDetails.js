import React from 'react';
import fastfood from "./Fastfood.png";
import './FoodDeliveryPostDetails.css'

class FoodDelivery extends React.Component {

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
                        <div className="viewpostfood">
                            <h3>Sarah24</h3>
                            <h2>14/04/22</h2>
                            
                            <h1> <u> TITLE Bring Jammin pasta to f5 room 311 TITLE-</u> have an exam in few hours, You can get anything you want from jammin too! &lt;3</h1>
                        </div>
                        
                </div>

                <a className="form-green-button" onClick={() => { onRouteChange('fooddelivery') }}>Back</a>

            </div>
			
		)
	}
}

export default FoodDelivery;