import styled from "styled-components";

export const TotalSendMail = styled.div`
	display: flex;
	margin-top: 2.25vh;
`;

export const SendMailText = styled.div`
	margin-right: 8px;
	color: #949494;
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: 24px;
`;

export const ReSendBtn = styled.div<{ isResend: boolean }>`
	display: flex;
	padding: 4px 12px;
	justify-content: center;
	align-items: center;
	color: ${({ isResend }) => (isResend ? "#D0D0D0" : "#525252")};
	border-radius: 6px;
	background-color: ${({ isResend }) => (isResend ? "#F7F7F7" : "#efefef")};
	cursor: pointer;
	pointer-events: ${({ isResend }) => isResend && "none"};
	font-size: 14px;
	font-style: normal;
	font-weight: 600;
	&:active {
		background: #d0d0d0;
	}
`;

export const InputNumber = styled.div`
	display: flex;
	margin-top: 55px;
`;
export const InputInfos = styled.div<{ isSelected: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-bottom: 7px;
	border-bottom: 2px solid ${({ isSelected }) => (isSelected ? "#ECAA00" : "#EFEFEF")};
	color: #c4c7c7;
	width: 18.46vw;
	margin-right: 20px;
`;
export const Code = styled.input`
	border: none;
	outline: none;
	width: 19.46vw;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-size: 3rem;
	font-weight: 700;
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
`;
export const TimeImg = styled.img`
	width: 16px;
	height: 16px;
	margin-top: 13px;
	margin-right: 4px;
`;

export const Time = styled.div`
	font-size: 14px;
	font-weight: 500;
	line-height: 18px;
	color: #b7b7b7;
	text-align: left;
	margin-top: 12px;
`;
