import React from 'react';
import fastfood from "./Fastfood.png";
import './FoodDelivery.css'

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
                        <div className="landingpost" >
                        
                        
                        
                            <h3 onClick={() => { onRouteChange('homepage') }}><a href="#">Sarah24</a></h3>
                            <h2>14/04/22</h2>
                            
                            <h1 > <u> TITLE Bring Jammin pasta to f5 room 311 TITLE-</u> have an exam in few hours, You can get anything you want from jammin too! &lt;3</h1>
                            <a className="form-green-button" onClick={() => { onRouteChange('ViewFoodDeliveryPost') }}>View post</a>
                        </div>
                        <div className="landingpost">
                            <h3 onClick={() => { onRouteChange('homepage') }}><a href="#">Humayun123</a></h3>
                            <h2>14/04/22</h2>
                            <h1><u>Food to law building-</u>Please bring samosa chat to law building ground floor, I'll pay 200Rs</h1>
                            <a className="form-green-button" onClick={() => { onRouteChange('ViewFoodDeliveryPost') }}>View post</a>
                        </div>
                        <div className="landingpost">
                            <h3 onClick={() => { onRouteChange('homepage') }}><a href="#">Naveed09</a></h3>
                            <h2>13/04/22</h2>
                            <h1><u>Can someone please bring fanta to sports complex</u> I have a match in 15 mins, get one for yourself aswell</h1>
                            <a className="form-green-button" onClick={() => { onRouteChange('ViewFoodDeliveryPost') }}>View post</a>
                        </div>
                </div>

                
                <a className="form-green-button-view"  onClick={() => { onRouteChange('ViewMyFoodDeliveryRequest') }}>View My Requests</a>
                <a className="form-green-button-post"  onClick={() => { onRouteChange('PostFoodDeliveryRequest') }}>Post a Request</a>
                
                    
                

            </div>
			
		)
	}
}

export default FoodDelivery;