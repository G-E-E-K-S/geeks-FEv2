import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import API from "../../../axios/BaseUrl";
import * as S from "./style";
import * as CS from "../../../components/Common/CommonStyle";
import HeaderMenu from "../../../components/Common/HeaderMenu";
import TopNumber from "../../../components/Join/TopNumber";
import JoinButton from "../../../components/Join/JoinButton";
import ErrorPopup from "../../../components/Common/ErrorPopup";
import { useUserInfo } from "../../../store/useUserInfo";
import Typography from "../../../components/Common/Layouts/Typography";

import Timmer from "../../../assets/img/Join/timmer.svg";

const InputCode = () => {
	// @ts-ignore
	const inputRefs = [useRef(), useRef(), useRef(), useRef()];
	const [isSelected, setIsSelected] = useState(false);
	const [isNextPage, setIsNextPage] = useState(false);
	const [isErrorPopup, setIsErrorPopup] = useState(false);
	const [isResend, setIsResend] = useState(false);
	const [timer, setTimer] = useState(180);
	const [min, setMin] = useState(3);
	const [sec, setSec] = useState(0);
	const navigate = useNavigate();
	const location = useLocation();
	const { email } = useUserInfo();

	const handleInputChange = (index, event) => {
		const nextIndex = index + 1;
		// @ts-ignore
		if (isNaN(inputRefs[index].current.value)) {
			return;
		} else {
			if (event.target.value.length === 1 && nextIndex < inputRefs.length) {
				// @ts-ignore
				inputRefs[nextIndex].current.focus();
			}
		}

		event.target.value.length > 0 ? setIsNextPage(true) : setIsNextPage(false);
	};

	const handleKeydown = (index, event) => {
		let beforeIndex = index - 1;
		if (index == 0) {
			beforeIndex = 0;
		}
		if (event.keyCode == 8) {
			// @ts-ignore
			inputRefs[beforeIndex].current.focus();
		}
	};

	const checkCode = () => {
		let code = "";
		for (let i = 0; i < 4; i++) {
			// @ts-ignore
			code += inputRefs[i].current.value;
		}

		async function fetchCode() {
			try {
				const res = await API.get(`/api/v1/user/auth/code/${email + "@sangmyung.kr"}/${code}`);
				if (res.data.success) {
					navigate("/password");
				} else {
					setIsErrorPopup(true);
				}
			} catch (error) {
				console.error(error);
				setIsErrorPopup(true);
			}
		}
		fetchCode();
	};

	const ChangeBarColor = () => {
		setIsSelected(true);
	};

	const ReSendEmail = () => {
		let UserEmail = location.state?.userEmail;
		async function fetchCode() {
			try {
				const res = await API.get("/mail/send?email=" + UserEmail + "@sangmyung.kr");
				if (res.status == 200) {
					setIsResend(true);
					setTimer(180);
				}
			} catch (error) {
				console.error(error);
			}
		}
		fetchCode();
	};

	useEffect(() => {
		if (timer === 181) {
			return;
		}

		const id = setInterval(() => {
			setTimer((timer) => timer - 1);
			setMin(Math.floor(timer / 60));
			setSec(timer % 60);
		}, 1000);

		if (timer === -1) {
			clearInterval(id);
			setTimer(181);
		}

		return () => clearInterval(id);
	}, [timer]);

	return (
		<>
			<CS.Header backgroundColor="White">
				<HeaderMenu />
			</CS.Header>
			<TopNumber page={2} />
			<Typography typoSize="H3" color="Gray800" style={{ marginTop: "16px", marginBottom: "40px" }}>
				{`수신된 메일에 적힌\n4자리 코드를 입력해 주세요`}
			</Typography>
			<S.TotalSendMail>
				<S.SendMailText>메일이 도착하지 않았나요?</S.SendMailText>
				<S.ReSendBtn onClick={() => ReSendEmail()} isResend={isResend}>
					인증 메일 재전송
				</S.ReSendBtn>
			</S.TotalSendMail>
			<S.InputNumber>
				{inputRefs.map((ref, index) => (
					<S.InputInfos isSelected={isSelected}>
						<S.Code
							key={index}
							// @ts-ignore
							ref={ref}
							type="text"
							inputMode="numeric"
							maxLength={1}
							pattern="\d*"
							onChange={(e) => handleInputChange(index, e)}
							onKeyUp={(e) => handleKeydown(index, e)}
							onFocus={() => ChangeBarColor()}
						/>
					</S.InputInfos>
				))}
			</S.InputNumber>
			<CS.Flex>
				<S.TimeImg src={Timmer} />
				<S.Time>
					{min}:{sec < 10 ? "0" + sec : sec}
				</S.Time>
			</CS.Flex>
			<ErrorPopup
				message={`코드가 일치하지 않아요`}
				bottom={`18.72`}
				setShowPopup={setIsErrorPopup}
				isShowPopup={isErrorPopup}
			/>
			<JoinButton
				btnName={"코드 확인하기"}
				select={() => ChangeBarColor()}
				handleClick={() => checkCode()}
				isNextPage={isNextPage}
			/>
		</>
	);
};

export default InputCode;
