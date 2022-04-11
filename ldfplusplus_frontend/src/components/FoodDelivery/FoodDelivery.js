import React from 'react';
import fastfood from "./Fastfood.png";
import './FoodDelivery.css'

class FoodDelivery extends React.Component {
	render() {
		const studentName = "Zafir Ansari"

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
                        <div className="landingpost">
                            <h3>Sarah24</h3>
                            <h2>14/04/22</h2>
                            
                            <h1> <u> TITLE Bring Jammin pasta to f5 room 311 TITLE-</u> have an exam in few hours, You can get anything you want from jammin too! &lt;3</h1>
                        </div>
                        <div className="landingpost">
                            <h3>Humayun3</h3>
                            <h2>14/04/22</h2>
                            <h1><u>Food to law building-</u>Please bring samosa chat to law building ground floor, I'll pay 200Rs</h1>
                        </div>
                        <div className="landingpost">
                            <h3>Naveed09</h3>
                            <h2>13/04/22</h2>
                            <h1><u>Can someone please bring fanta to sports complex</u> I have a match in 15 mins, get one for yourself aswell</h1>
                        </div>
                </div>

                <div className="viewreq">
                    <h2>View My Requests</h2>
                </div>
                <div className="postreq">
                    <h2>Post a Request</h2>
                </div>

            </div>
			
		)
	}
}

export default FoodDelivery;