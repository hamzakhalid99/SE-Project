import React from 'react';
import fastfood from "./Fastfood.png";
import './FoodDelivery.css'
import BACKEND_LINK from './../../env.js';

class FoodDelivery extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            numberofposts: 3,
            rem: null,
            posts: [],
            viewsingle: false
        }
    }

    componentWillMount() {
        fetch(BACKEND_LINK + '/fooddelivery', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
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
                this.setState({ posts: response.backenddata, rem: response.rem, numberofposts: response.backenddata.length + 3 })
            }
        })
    }

    fetchMorePosts = () => {
        fetch(BACKEND_LINK + '/fooddelivery', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
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
                this.setState({ posts: response.backenddata, rem: response.rem, numberofposts: response.backenddata.length + 3 })
                
                if (response.rem === 0) {
                    alert("You're all caught up!")
                }
            }
        })
    }

	render() {
        const { user } = this.props
        const { onRouteChange, loadPost } = this.props;
        const posts = this.state.posts.map(function(post) {
            return (
                <div className="landingpost" key={ post._id } >
                    <h3 onClick={() => { onRouteChange('homepage') }}><a href="#">{ post.postedby.fullname }</a></h3>
                    <h2>{ post.date.slice(0, 10) + " " + post.date.slice(11, 19)  }</h2>
                    <h1 > <u> { post.title } </u> { post.content.slice(0, 50) + "..." } </h1>
                    <a className="form-green-button" onClick={() => { loadPost(post) }}>View post</a>
                </div>
            )
        })
        

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
                        { posts}       
                        {/*<div className="landingpost" >
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
                        </div>*/}
                        <a className="form-green-button-view viewmore" onClick={this.fetchMorePosts} >View More</a>
                </div>

                
                <a className="form-green-button-view"  onClick={() => { onRouteChange('ViewMyFoodDeliveryRequest') }}>View My Requests</a>
                <a className="form-green-button-post"  onClick={() => { onRouteChange('PostFoodDeliveryRequest') }}>Post a Request</a>
                    
                

            </div>
			
		)
	}
}

export default FoodDelivery;