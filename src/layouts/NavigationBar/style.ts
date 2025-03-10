import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const TotalNavigationBar = styled.div`
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	position: fixed;
	z-index: 1000;
	bottom: 0;
	left: 0;
	width: 100vw;
	height: 100px;
	border-radius: 12px 12px 0px 0px;
	border-top: 1px solid #efefef;
	background: #fff;
`;

export const StyledNavLink = styled(NavLink)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 4px;
	flex: 1;
	cursor: pointer;
	transition: all 0.3s;
	padding-bottom: 20px;

	&.active {
		color: ${({ theme }) => theme.Black};
	}

	&.inactive {
		color: ${({ theme }) => theme.Gray400};
	}
`;
