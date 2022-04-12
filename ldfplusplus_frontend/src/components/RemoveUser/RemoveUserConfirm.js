import React from 'react';
import './RemoveUserConfirm.css'

const RemoveUserConfirm = ({ onConfirm, onCancel }) => {
	return (
		<div className="removeUserConfirm">
			<p className="dialogText">
				You are about to remove selected user. Do you want to continue?
			</p>
			<div className="buttons">
				<button onClick={onConfirm} className="removeButton">Remove</button>
				<button onClick={onCancel} className="cancelButton">Cancel</button>
			</div>
		</div>
	)
}

export default RemoveUserConfirm;