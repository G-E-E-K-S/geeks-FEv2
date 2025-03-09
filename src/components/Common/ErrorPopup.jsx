import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Error from "../../assets/img/Common/error.svg";

const ErrorIcon = styled.img`
	width: 24px;
	height: 24px;
	margin-right: 8px;
`;

const PopupBox = styled.div`
	width: 89.74vw;
	height: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	bottom: ${(props) => props.bottom - 8.3 + "vh"};
	top: ${(props) => props.top && "0%"};
	border-radius: 12px;
	color: #fff;
	text-align: center;
	font-size: 1rem;
	font-weight: 600;
	line-height: 24px;
	margin: auto 0;
	opacity: 0;
	color: #cb3d0b;
	background: #fcede8;
	left: 50%;
	transform: translateX(-50%);

	${(props) => props.top != null && "transition: top 0.8s ease, opacity 0.5s ease;"};
	${(props) => props.bottom != null && "transition: bottom 0.8s ease, opacity 0.5s ease;"};

	&.active {
		bottom: ${(props) => props.bottom + "vh"};
		top: ${(props) => props.top + "vh"};
		opacity: 1;
		animation: vibrate 0.5s ease-in-out;
	}

	&:not(.active) {
		opacity: 0;
	}
	@keyframes vibrate {
		0% {
			transform: translateX(-50%);
		}
		20% {
			transform: translateX(calc(-50% - 4px));
		}
		40% {
			transform: translateX(calc(-50% + 3px));
		}
		60% {
			transform: translateX(calc(-50% - 2px));
		}
		80% {
			transform: translateX(calc(-50% + 1.5px));
		}
		100% {
			transform: translateX(-50%);
		}
	}
`;

const ErrorPopup = (props) => {
	useEffect(() => {
		const timeId = setTimeout(() => {
			props.setShowPopup(false);
		}, 1000);

		return () => {
			clearTimeout(timeId);
		};
	}, [props.isShowPopup]);

	return (
		<PopupBox bottom={props.bottom} top={props.top} className={props.isShowPopup ? "active" : ""}>
			<ErrorIcon src={Error} />
			{props.message}
		</PopupBox>
	);
};
export default ErrorPopup;
