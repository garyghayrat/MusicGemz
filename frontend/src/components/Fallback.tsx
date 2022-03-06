import React from "react";

const Fallback = () => {
	return (
		<div style={{position: "absolute",
					top: "40%",
					left: "50%",
					marginRight: "-50%",
					transform: "translate(-50%, -50%)"}}>
			<p style={{fontSize:"35px", fontWeight:550}}>Please install an ethereum wallet</p>
			<p style={{fontSize:"25px", paddingTop:"15px"}}>
				<a style={{textDecoration:"underline"}} href="https://metamask.io/" target="_blank">Metamask</a> 
				&nbsp; is a common choice</p>
		</div>
	);
};

export default Fallback;
