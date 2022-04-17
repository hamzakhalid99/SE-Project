import React from 'react';
import Marketplace from "./Marketplace.png";
import './MarketplaceNewPost.css'
import BACKEND_LINK from './../../env.js';
class MarketplaceNewPost extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            content: '',
            title: '',
            contact: '',
            field:'Buying',
            user_id: this.props.user.user_id,
        }
    }

    onTitleChange = (event) => {
        this.setState({ title: event.target.value })
    }

    onDetailsChange = (event) => {
        this.setState({ content: event.target.value })
    }

    onContactChange = (event) => {
        this.setState({ contact: event.target.value })
    }

    onTypeChange = (event) => {
        this.setState({ field: event.target.value })
    }

    onSubmitPost = (event) => {
        event.preventDefault()
		fetch(BACKEND_LINK+'/marketplace/post', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.state)
		})
		.then(response => response.json())
		.then(user => {	
			this.props.onRouteChange('marketplace')
			
		})
	} 

	render() {

        const { onRouteChange } = this.props;

        return (
            <div>
                <div className="homepage body-center-align">
                    <div className="homepageprofile">
                    <img className="iconpic" src={ Marketplace } />  
                    </div>

                        <div className="usecasename">
                        <p>Marketplace</p>
                        </div>

                </div> 

                
                <div className="post-container">
                    <div>
                        <form className="postform" onSubmit={this.onSubmitPost}>
                            <input className="posttitle" placeholder="Post Title" type="text" onChange={this.onTitleChange} />
                            <input className="posttitle" placeholder="Contact" type="text" onChange={this.onContactChange} />
                            <input className="posttitle" placeholder="Field" type="d" onChange={this.onContactChange} />
                            <select className="searchBar fix" onChange={this.onTypeChange}>
                                <option value="Buying">Buying</option>
                                <option value="Selling">Selling</option>
                            </select>
                            {/* <input className="posttitle" placeholder="Area to" type="text" onChange={this.onAreaToChange} />
                            <input className="posttitle" placeholder="Area from" type="text" onChange={this.onAreaFromChange} /> */}
                            <input className="postdetails" placeholder="Post Details" type="text" onChange={this.onDetailsChange} />
                            
                            <input className="post-green-button" value="Post" type="submit" />
                            <a className="form-red-button" onClick={() => { onRouteChange('marketplace') }}>Back</a>
                        </form>
                    </div>
                   
                </div>
            </div>
        )
		
	}
}

export default MarketplaceNewPost;