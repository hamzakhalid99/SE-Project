import React from 'react';
import iconpic from "./Groups.png";
import './DiscussionPortal.css'
import BACKEND_LINK from './../../env.js';
import SearchBox from './../SearchBox/SearchBox'


class DiscussionPortal extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            numberofposts: 3,
            rem: null,
            posts: [],
            keyword: '',
            viewsingle: false
        }
    }

    componentWillMount() {
        fetch(BACKEND_LINK + '/discussionportal', {
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
        fetch(BACKEND_LINK + '/discussionportal', {
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

    onSearchChange = (event) => {
        this.setState({keyword: event.target.value})
    }

    render() {
        const { user } = this.props
        const { onRouteChange, loadPost } = this.props;
        const posts = this.state.posts.map(function(post) {
            return (
                <div className="landingpost" key={ post._id } >
                    <h3>{ post.postedby.fullname }</h3>
                    <h2>{ post.date.slice(0, 10) + " " + post.date.slice(11, 19)  }</h2>
                    <h1 > <u> { post.title } </u> { post.content.slice(0, 50) + "..." } </h1>
                    <a className="form-green-button" onClick={() => { loadPost(post,'ViewPostDetails') }}>View post</a>
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
                        <p>Discussion Portal</p>
                        </div>

                </div>
                    <div className="landinghappening">
                        <SearchBox searchChange={this.onSearchChange} onSubmit={this.onSubmitSearch}/>
                        { posts} 
                        <a className="form-green-button-view viewmore" onClick={this.fetchMorePosts} >View More</a>
                </div>

                
                <a className="form-green-button-view"  onClick={() => { onRouteChange('ViewMyDiscussionPortalRequest') }}>View My Requests</a>
                <a className="form-green-button-post"  onClick={() => { onRouteChange('PostDiscussionPortalRequest') }}>Post a Request</a>
                    
                

            </div>
            
        )
    }
}

export default DiscussionPortal;