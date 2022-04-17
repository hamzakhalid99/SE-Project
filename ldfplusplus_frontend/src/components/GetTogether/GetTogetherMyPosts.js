import React from 'react';
import iconpic from "./Group Work.png";
import './GetTogether.css'
import BACKEND_LINK from './../../env.js';

class GetTogetherMyPosts extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            myposts: [],
            user_id: this.props.user.user_id
        }
    }

    componentWillMount() {
        fetch(BACKEND_LINK + '/gettogether/myposts', {
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
                this.setState({ myposts: response.backenddata })
            }
        })
    }

    onDelete = (post) => {
        fetch(BACKEND_LINK + '/gettogether/delete', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(post)
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) {
                alert(response.error)
            }
            else if (response.message) {
                alert(response.message)
                fetch(BACKEND_LINK + '/gettogether/myposts', {
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
                        this.setState({ myposts: response.backenddata })
                    }
                })
            }
            else if (response.backenddata) {
                this.setState({ myposts: response.backenddata })
            }
        })   
    }


	render() {

        const { onRouteChange, user } = this.props;
        const onDeleteVar = this.onDelete

        const myposts = this.state.myposts.map(function(post) {
            return (
                <div className="viewmyfoodpost" key={ post._id }>
                    <h3>{ post.user_id }</h3>
                    <h2>{ post.date.slice(0, 10) + " " + post.date.slice(11, 19)  }</h2>
                    <h1> <u> { post.title } </u> { post.content }</h1>
                    <button className="delete-button" onClick={() => { onDeleteVar(post) } }>Delete</button>
                </div>
            )
        })

        return (
            <div>
                <div className="homepage body-center-align">
                    <div className="homepageprofile">
                    <img className="iconpic" src={ iconpic } />  
                    </div>

                        <div className="usecasename">
                        <p>Get Together</p>
                        </div>

                </div> 

                <div className='divwrapper'>

                <div className="landinghappening">
                        { myposts }
                </div>

                

                </div>
                <a className="form-green-button" onClick={() => { onRouteChange('gettogethers') }}>Back</a>
                
               
            </div>
        )
		
	}
}

export default GetTogetherMyPosts;