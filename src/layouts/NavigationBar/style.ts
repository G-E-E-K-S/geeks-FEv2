import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const TotalNavigationBar = styled.div`
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	position: fixed;
	bottom: 0;
	width: 100vw;
	padding: 12px 0;
	height: 76px;
	border-radius: 12px 12px 0px 0px;
	border-top: 1px solid #efefef;
	background: #fff;
`;

export const StyledNavLink = styled(NavLink)`
	display: flex;
	height: 76px;
	justify-content: center;
	align-items: center;
	gap: 4px;
	flex: 1;
	cursor: pointer;
	transition: 0.3s;

	&.active {
		color: ${({ theme }) => theme.Black};
	}
	&.inactive {
		color: ${({ theme }) => theme.Gray400};
	}
`;
