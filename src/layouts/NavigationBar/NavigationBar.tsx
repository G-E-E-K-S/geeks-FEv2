import * as S from "./style";
import Typography from "../../components/Common/Layouts/Typography";

import MyPage from "../../assets/img/Navigation/myPage.svg?react";
import CalendarIcon from "../../assets/img/Navigation/CalendarIcon.svg?react";
import Home from "../../assets/img/Navigation/home.svg?react";

export default function NavigationBar() {
	return (
		<S.TotalNavigationBar>
			<S.StyledNavLink to="/home" end>
				<Home />
				<Typography typoSize="B3_semibold">{"홈"}</Typography>
			</S.StyledNavLink>
			<S.StyledNavLink to="/calendar" end>
				<CalendarIcon />
				<Typography typoSize="B3_semibold">{"캘린더"}</Typography>
			</S.StyledNavLink>
			<S.StyledNavLink to="/mypage" end>
				<MyPage />
				<Typography typoSize="B3_semibold">{"마이"}</Typography>
			</S.StyledNavLink>
		</S.TotalNavigationBar>
	);
}
