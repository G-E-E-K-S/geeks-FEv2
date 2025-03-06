import { Outlet, useLocation } from "react-router-dom";

import * as S from "./style";
import { theme } from "../styles/theme";

export default function RootLayout() {
	const location = useLocation();
	let background;

	switch (location.pathname) {
		case "/findRoomate":
			background = "linear-gradient(180deg, #FFF 0%, #F7F7F7 71%)";
			break;
		case "/home":
		case "/liveRule":
			background = theme.Background;
			break;
		default:
			background = theme.White;
			break;
	}

	// linear-gradient(180deg, #FFF 0%, #F7F7F7 71%) - findRoommate
	// #FAFAFA - home / liveRule

	return (
		<S.Totalframe background={background}>
			<Outlet />
		</S.Totalframe>
	);
}
