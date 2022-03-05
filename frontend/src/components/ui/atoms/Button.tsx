import React from "react";

interface buttonProps {
	onClick?: () => void;
	title: string;
	height?: string;
	width?: string;
	buttonClass?: string;
	url?: string;
	fontSize?: string;
	fontWeight?: string;
}

export const Button = (props: buttonProps) => {
	return (
		<a href={props.url ? props.url : "#"} target="_blank" rel="noreferrer">
			<button
				className={`btn ${props.buttonClass}`}
				style={{
					height: props.height,
					width: props.width,
					fontSize: props.fontSize,
					fontWeight: props.fontWeight,
				}}
			>
				{props.title}
			</button>
		</a>
	);
};
