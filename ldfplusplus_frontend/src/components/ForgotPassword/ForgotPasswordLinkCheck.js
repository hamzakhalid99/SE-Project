import React from 'react';
import './ForgotPasswordLinkCheck.css'

const ForgotPasswordLinkCheck = ({ onLinkCheck }) => {
	return (
		<div className="forgotPasswordConfirm">
			<p className="dialogText">
				Check registered email for link.
			</p>
			<div className="buttons">
				<button onClick={onLinkCheck} className="cancelButton">Continue</button>
			</div>
		</div>
	)
}

export default ForgotPasswordLinkCheck;