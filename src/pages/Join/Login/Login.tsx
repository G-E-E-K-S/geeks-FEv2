import { useNavigate } from "react-router-dom";
import { useState, useMemo, use } from "react";
import styled from "styled-components";
import API from "../../../axios/BaseUrl";
import * as CS from "../../../components/Common/CommonStyle";
import HeaderMenu from "../../../components/Common/HeaderMenu";
import ErrorPopup from "../../../components/Common/ErrorPopup";
import TextFields from "../../../components/DesignStuff/TextFields/TextFields";
import Button from "../../../components/DesignStuff/Button/Button";
import Typography from "../../../components/Common/Layouts/Typography";
import Row from "../../../components/Common/Layouts/Row";

// IMG
import ForgetPwdImg from "../../../assets/img/Join/forgetPwd.svg";
import NoShowPwd from "../../../assets/img/Join/NoShowPwd.svg";
import ShowPwd from "../../../assets/img/Join/ShowPwd.svg";
import Column from "../../../components/Common/Layouts/Column";
import { useGetToken } from "../../../store/useGetToken";
import { AxiosError } from "axios";

const ForgetPwdIcon = styled.img`
    width: 16px;
    height: 16px;
`;
const InputEmail = () => {
	const [isEmailError, setIsEmailError] = useState(false);
	const [isPwdError, setIsPwdError] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isNextPage, setIsNextPage] = useState(false);
	const [isErrorPopup, setIsErrorPopUp] = useState(false);
	const [showPwd, setShowPwd] = useState(false);
	const [automaticLogIn, setAutomaticLogIn] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	useMemo(() => {
		email.length > 0 && password.length ? setIsNextPage(true) : setIsNextPage(false);
	}, [email, password]);

	const handleEmail = () => {
		async function fetchLogin() {
			try {
				const res = await API.post("/api/v1/user/login", {
					email: email + "@sangmyung.kr",
					password: password
				});

				if (res.data.success) {
					localStorage.setItem("token", res.data.data);
					setAutomaticLogIn(true);
					navigate("/home", { replace: true });
				}
			} catch (error) {
				// 팝업 바꾸고 수정해야 함, 실험
				if (error instanceof AxiosError) {
					if (!error.response) return;

					if (error.response.data.error.code === 40403) {
						setIsErrorPopUp(true);
						setIsEmailError(true);
						setIsPwdError(false)
						setErrorMessage(error.response.data.error.message);
					} else {
						setIsErrorPopUp(true);
						setIsPwdError(true);
						setIsEmailError(false);
						setErrorMessage(error.response.data.error.message);
					}
				}
			}
		}

		fetchLogin();
	};

	const handlePwd = () => {
		setShowPwd(!showPwd);
	};
	return (
		<>
			<CS.Header backgroundColor="White">
				<HeaderMenu />
			</CS.Header>
			<Typography typoSize="H3" color="Gray800" style={{ marginTop: "16px", marginBottom: "40px" }}>
				{`학교 이메일 주소로\n로그인 해주세요`}
			</Typography>
			<Column gap={20}>
				<TextFields
					isError={isEmailError}
					onChange={(val) => setEmail(val)}
					fixedText={"@sangmyung.kr"}
					placeholder={"학번"}
					inputType="number"
					maxLength={9}
				/>
				<TextFields
					isError={isPwdError}
					onChange={(val) => setPassword(val)}
					placeholder={"비밀번호"}
					inputType={showPwd ? "text" : "password"}
					maxLength={15}
					icon={showPwd ? ShowPwd : NoShowPwd}
					onClick={handlePwd}
				/>
				<Row verticalAlign="center" gap={4} onClick={() => navigate("/findPassword")}>
					<Typography typoSize="B2_medium" color="Gray600">{`비밀번호를 잊어버리셨나요?`}</Typography>
					<ForgetPwdIcon src={ForgetPwdImg} />
				</Row>
			</Column>
			<ErrorPopup
				message={errorMessage}
				bottom={`20`}
				setShowPopup={setIsErrorPopUp}
				isShowPopup={isErrorPopup}
			/>
			<Button text={"로그인"} isNextPage={isNextPage} onClick={() => handleEmail()} />
		</>
	);
};

export default InputEmail;
