import React from 'react';
import careerhelp from "./Careerhelp.png";
import './CareerhelpNewPost.css'
import BACKEND_LINK from './../../env.js';

class CareerhelpNewPost extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            content: '',
            title: '',
            salary: '',
            location: '',
            user_id: this.props.user.user_id
        }
    }

    onTitleChange = (event) => {
        this.setState({ title: event.target.value })
    }

    onDetailsChange = (event) => {
        this.setState({ content: event.target.value })
    }

    onSalaryChange = (event) => {
        this.setState({ salary: event.target.value })
    }

    onLocationChange = (event) => {
        this.setState({ location: event.target.value })
    }


    onSubmitPost = (event) => {
        event.preventDefault()
		fetch(BACKEND_LINK+'/careerhelp/post', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.state)
		})
		.then(response => response.json())
		.then(user => {	
			this.props.onRouteChange('careerhelp')
			
		})
	} 

	render() {

        const { onRouteChange } = this.props;

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

                
                <div className="post-container">
                    <div>
                        <form className="postform" onSubmit={this.onSubmitPost}>
                            <input className="posttitle" placeholder="Post Title" type="text" onChange={this.onTitleChange} />
                            <input className="posttitle" placeholder="Salary" type="text" onChange={this.onSalaryChange} />
                            <input className="posttitle" placeholder="Location" type="text" onChange={this.onLocationChange} />
                            <input className="postdetails" placeholder="Post Details" type="text" onChange={this.onDetailsChange} />
                            
                            <input className="post-green-button" value="Post" type="submit" />
                            <a className="form-red-button" onClick={() => { onRouteChange('careerhelp') }}>Back</a>
                        </form>
                    </div>
                   
                </div>
            </div>
        )
		
	}
}

export default CareerhelpNewPost;