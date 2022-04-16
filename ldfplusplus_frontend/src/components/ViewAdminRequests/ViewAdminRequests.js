import React from 'react';
import Adminicon from "./AddModerator.png";
import './ViewAdminRequests.css'

class AdminRequest extends React.Component {

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
                    <img className="iconpic" src={ Adminicon } />  
                    </div>

                        <div className="usecasename">
                        <p>View Admin Requests</p>
                        </div>

                </div>
                    <div className="landinghappeningadmin">
                        <div className="landingpost" >
                        
                        
                            <h4>Adminship Request</h4>
                            <h3 onClick={() => { onRouteChange('homepage') }}><a href="#">Sarah24</a></h3>
                            <h1>mere ko bana do mujhey bara shauk hai</h1>
                            <h2>14/04/22</h2>
                            
                            
                            
                            <a className="form-green-button" onClick={() => { onRouteChange('ViewFoodDeliveryPost') }}>Add Admin</a>
                            <a className="form-red-button" onClick={() => { onRouteChange('ViewFoodDeliveryPost') }}>Remove Admin</a>
                        </div>
                        <div className="landingpost">
                            <h4>Adminship Request</h4>
                            <h3 onClick={() => { onRouteChange('homepage') }}><a href="#">Humayun123</a></h3>
                            <h1>wow grape</h1>
                            <h2>14/04/22</h2>
                            
                            <a className="form-green-button" onClick={() => { onRouteChange('ViewFoodDeliveryPost') }}>Add Admin</a>
                            <a className="form-red-button" onClick={() => { onRouteChange('ViewFoodDeliveryPost') }}>Remove Admin</a>
                        </div>
                        <div className="landingpost">
                            <h4>Adminship Request</h4>
                            <h3 onClick={() => { onRouteChange('homepage') }}><a href="#">Naveed09</a></h3>
                            <h1>I am the best</h1>
                            <h2>13/04/22</h2>
                            
                            <a className="form-green-button" onClick={() => { onRouteChange('ViewFoodDeliveryPost') }}>Add Admin</a>
                            <a className="form-red-button" onClick={() => { onRouteChange('ViewFoodDeliveryPost') }}>Remove Admin</a>
                        </div>
                </div>

                
                {/* <a className="form-green-button-view"  onClick={() => { onRouteChange('ViewMyFoodDeliveryRequest') }}>View My Requests</a>
                <a className="form-green-button-post"  onClick={() => { onRouteChange('PostFoodDeliveryRequest') }}>Post a Request</a> */}
                
                    
                

            </div>
			
		)
	}
}

export default AdminRequest;