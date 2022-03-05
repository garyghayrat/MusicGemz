import React from "react";
import { Button } from "../atoms/Button";
import { HeaderNotification } from "./HeaderNotification";

export const Header = () => {
	return (
		<>
			<HeaderNotification text="Header" />
			<header className="menu__header">
				<nav>
					<ul>
						<li>
							<a href="#">Team</a>
						</li>
						<li>
							<a href="#">Community</a>
						</li>
					</ul>
				</nav>
				<Button
					title="Upload"
					buttonClass="btn-primary"
					fontWeight="500"
					fontSize="1.318rem"
				/>
			</header>
		</>
	);
};
