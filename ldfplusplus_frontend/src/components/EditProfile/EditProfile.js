import React from 'react';
import zafirtest from './zafirtest.png';
import Edit from "./Edit.png";
import './EditProfile.css'

class EditProfile extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			happenings: []
		}
	}



	render() {
		const studentName = "Zafir Ansariiii"
        const { onRouteChange } = this.props;
        const { user } = this.props;
		return (
            
            
			<div className="homepage body-center-align">
				<div className="homepageprofile">
                <img className="iconpic" src={ Edit } />
                <div className="usecasename">
                        <p>Edit Profile</p>
                        </div>
                        <div></div>
					<img className="homepagepicedit" src={ zafirtest } />
					<p>In love with this new app!</p>
					<h1>{ user.fullname }</h1>
					<h3>Student</h3>
				</div>
				<div className="happening">
					<h2>What's happening on campus?</h2>
					{/* <div className="happeningCard"><p>{this.state.happenings[0]}</p></div>
					<div className="happeningCard"><p>{this.state.happenings[1]}</p></div>
					<div className="happeningCard"><p>{this.state.happenings[2]}</p></div> */}
				</div>

                <a className="form-green-button-viewdisplay"  onClick={() => { onRouteChange('editname') }}>Change Display Name</a>
                <a className="form-green-button-postdisplay"  onClick={() => { onRouteChange('editpassword') }}>Change Password</a>
                {/* <a className="form-green-button-changedisplay"  onClick={() => { onRouteChange('PostFoodDeliveryRequest') }}>Change Display Picture</a> */}
			</div>
		)
	}
}

export default EditProfile;