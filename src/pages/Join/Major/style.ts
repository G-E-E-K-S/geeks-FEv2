import styled from "styled-components";

export const MajorBtsTxt = styled.div`
	color: #333;
	font-size: 1.25rem;
	font-weight: 700;
	line-height: 28px;
	margin-bottom: 20px;
`;
export const CloseImg = styled.img`
	width: 28px;
	height: 28px;
`;

export const MajorTotal = styled.div`
	margin-top: 20px;
	padding: 7px 0px 8px 0px;
	display: flex;
	justify-content: space-between;
	width: 100%;
	border-bottom: 2px solid #efefef;
`;

export const StudentNumTotal = styled(MajorTotal)`
	width: fit-content;
	gap: 30px;
`;
