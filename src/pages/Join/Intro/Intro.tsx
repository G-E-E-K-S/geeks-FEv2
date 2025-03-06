import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as CS from "../../../components/Common/CommonStyle";
import mainLogo from "../../../assets/img/Join/mainLogo.svg";

const IntroLogo = styled.div`
	height: 100vh;
	min-height: -webkit-fill-available;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default function Intro() {
	const navigation = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			navigation("/welcome");
		}, 1000);

		return () => clearTimeout(timer);
	}, [navigation]);

	return (
		<IntroLogo>
			<img src={mainLogo} alt="Main Logo" />
		</IntroLogo>
	);
}
