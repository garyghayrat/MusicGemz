import React from "react";

interface headerNotificationProps {
	text: string;
}

export const HeaderNotification = (props: headerNotificationProps) => {
	return (
		<section className="section__header-notification">
			<h3>{props.text}</h3>
		</section>
	);
};
