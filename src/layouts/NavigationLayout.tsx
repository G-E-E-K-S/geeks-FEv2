import { Outlet } from "react-router-dom";

import * as S from "./style";
import NavigationBar from "./NavigationBar/NavigationBar";


export default function NavigationLayout() {
	return (
		<S.ScreenComponent>
			{/* <Header/> */}
			<Outlet />
			<NavigationBar />
		</S.ScreenComponent>
	);
}
