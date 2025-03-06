import styled from "styled-components";
import { Color } from "../../types/color";



export const SubScreen = styled.div`
	// height: calc(100vh - 11.84vh);
`;

export const ScreenJoin = styled.div<{ email?: boolean }>`
	padding-top: ${({ email }) => (email ? "90px" : "13.86vh")};
	display: flex;
	flex-direction: column;
`;

export const Flex = styled.div`
	display: flex;
`;

export const SpaceBetween = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const DirectionCol = styled.div`
	display: flex;
	flex-direction: column;
`;

export const FlexCenter = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Header = styled.div<{ backgroundColor: Color | string }>`
	margin-bottom: 16px;
	position: sticky;
	top: 0px;
	padding: 0px 20px 0 20px;
	width: calc(100% + 42px);
	z-index: 10;
	margin-left: calc(-50vw + 50%);
	background-color: ${({ theme, backgroundColor }) => theme[backgroundColor]};
`;
