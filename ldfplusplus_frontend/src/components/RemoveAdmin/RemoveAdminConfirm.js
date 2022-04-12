import React from 'react';
import './RemoveAdminConfirm.css'

const RemoveAdminConfirm = ({ onConfirm, onCancel }) => {
	return (
		<div className="removeUserConfirm">
			<p className="dialogText">
				You are about to remove selected admin. Do you want to continue?
			</p>
			<div className="buttons">
				<button onClick={onConfirm} className="removeButton">Remove</button>
				<button onClick={onCancel} className="cancelButton">Cancel</button>
			</div>
		</div>
	)
}

export default RemoveAdminConfirm;