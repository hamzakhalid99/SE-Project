import React from 'react';
import './AddCourses.css';
import addcourses from './Library Add.png';
import uploadicon from './File Upload.png';
import loadingicon from './green_style.gif';
import BACKEND_LINK from './../../env.js';
class AddCourses extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			semesters: ["Fall 2021", "Spring 2022", "Fall 2022", "Spring 2023", "Fall 2023"],
			selectedSemester: '',
			fileName: 'Upload File',
			uploadedFile: '',
			icon: uploadicon,
			submitted: ''
		}
	}

	componentWillMount() {
		//Fetch semesters
	}

	onSemesterChange = (event) => {
		this.setState({ selectedSemester: event.target.value})
	}

	getFile = (file) => {
		return new Promise ((resolve, reject) => {
          const reader = new FileReader ();
          reader.readAsText(file);
          reader.onload = _ => resolve (reader.result);
          reader.onerror = e => reject (e);
        });
	}

	onFileUpload = (event) => {
        this.getFile(event.target.files[0]).then((file) => {
            console.log(file);
            this.setState({uploadedFile: file, fileName: event.target.files[0].name })
        })
    }

    onUploadSubmit = (event) => {
    	this.setState({ icon: loadingicon })
    	setTimeout(() =>{
            this.setState({ icon: uploadicon })
        }, 3000)
    }

    onClickSubmit = (event) => {
    	fetch(BACKEND_LINK+'/addcourses', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this.state)
		})
		.then(response => response.json())
		.then(user => {
			this.setState({ submitted: "Submitted!"})
		})
    }

	render() {
		const semestersList = this.state.semesters.map((semester, i) => {
			return <option value={semester}>{semester}</option>
		})

		return (
			<div className="removeUser">
				<div className="usecase-heading">
					<img className="usecase-img" src={ addcourses } />
					<h1 className="usecase-heading-text">Add Courses</h1>
				</div>
				<div className="addCourses">
					<select className="searchBar" onChange={this.onSemesterChange}>
						{ semestersList }
					</select>
					<div className="uploadCourses">
						<label className="uploadCoursesBar whiteBackground" for="file">{this.state.fileName} </label>
                    	<input className="hidden" placeholder="Upload Picture" id="file" type="file" onChange={this.onFileUpload}/>
						<img className="usecase-img uploadPositioning" src={this.state.icon} />
                    	<button className="green-button" onClick={this.onUploadSubmit} >Upload File</button>
					</div>
					<button onClick={this.onClickSubmit} className="green-button submitFiles">Submit Files</button>
					<p>{this.state.submitted}</p>
				</div>
			</div>
		)
	}
}

export default AddCourses;