import React from 'react';
import Adminicon from "./AddModerator.png";
import './ViewAdminRequests.css'
import BACKEND_LINK from './../../env.js'

class AdminRequest extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            requests: []
        }
    }

    componentWillMount() {
        fetch(BACKEND_LINK + '/adminreqs', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.props.user)
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) {
                alert(response.error)
            }
            else if (response.message) {
                alert(response.message)
            }
            else if (response.backenddata) {
                this.setState({ requests: response.backenddata})
            }
        })
    }

    addAdmin = (request) => {
        fetch(BACKEND_LINK + '/adminreqs/accept', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(request)
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) {
                alert(response.error)
            }
            else if (response.message) {
                alert(response.message)
                fetch(BACKEND_LINK + '/adminreqs', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(this.props.user)
                })
                .then(response => response.json())
                .then(response => {
                    if (response.error) {
                        alert(response.error)
                    }
                    else if (response.message) {
                        alert(response.message)
                    }
                    else if (response.backenddata) {
                        this.setState({ requests: response.backenddata })
                    }
                })
            }
            else if (response.backenddata) {
                this.setState({ requests: response.backenddata })
            }
        })
    }

    rejectAdmin = (request) => {
        fetch(BACKEND_LINK + '/adminreqs/reject', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(request)
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) {
                alert(response.error)
            }
            else if (response.message) {
                alert(response.message)
                fetch(BACKEND_LINK + '/adminreqs', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(this.props.user)
                })
                .then(response => response.json())
                .then(response => {
                    if (response.error) {
                        alert(response.error)
                    }
                    else if (response.message) {
                        alert(response.message)
                    }
                    else if (response.backenddata) {
                        this.setState({ requests: response.backenddata })
                    }
                })
            }
            else if (response.backenddata) {
                this.setState({ requests: response.backenddata })
            }
        })
    }

	render() {
        const { onRouteChange } = this.props;
        const addAdmin = this.addAdmin
        const rejectAdmin = this.rejectAdmin

        const requests = this.state.requests.map(function(request) {
            return (
                <div className="landingpost" key={ request._id }>
                    <h4>Adminship Request</h4>
                    <h3>{ request.fullname }</h3>
                    <h1>{ request.content}</h1>
                    <h2>{ request.date.slice(0, 10) + " " + request.date.slice(11, 19)  }</h2>
                    <a className="form-green-button" onClick={() => addAdmin(request)}>Add Admin</a>
                    <a className="form-red-button" onClick={() => rejectAdmin(request)} >Reject Request</a>
                </div>
            )
        })

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
                        { requests }
                </div>

                
                {/* <a className="form-green-button-view"  onClick={() => { onRouteChange('ViewMyFoodDeliveryRequest') }}>View My Requests</a>
                <a className="form-green-button-post"  onClick={() => { onRouteChange('PostFoodDeliveryRequest') }}>Post a Request</a> */}
                
                    
                

            </div>
			
		)
	}
}

export default AdminRequest;