import styled from "styled-components";

import Row from "../../../components/Common/Layouts/Row";

export const AgreeTotal = styled(Row)<{ isTotalCheck: boolean }>`
	width: 100%;
	height: 60px;
	border-radius: 12px;
	padding: 19px 20px;
	margin-top: 47px;
	margin-bottom: 32px;
	background-color: ${({ theme, isTotalCheck }) => (isTotalCheck ? theme.Yellow50 : theme.Gray50)};
	border: 1px solid ${({ theme, isTotalCheck }) => (isTotalCheck ? theme.Yellow600 : "transparent")};
`;

export const AgreeText = styled.div`
	font-size: 1rem;
	font-weight: 500;
	line-height: 24px;
	text-align: left;
	color: #525252;
	border-bottom: 1px solid #525252;
`;
