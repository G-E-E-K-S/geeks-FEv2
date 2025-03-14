import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import API from "../../../axios/BaseUrl";
import * as CS from "../../../components/Common/CommonStyle";
import HeaderMenu from "../../../components/Common/HeaderMenu";
import Button from "../../../components/DesignStuff/Button/Button";
import TextFields from "../../../components/DesignStuff/TextFields/TextFields";
import ErrorPopup from "../../../components/Common/ErrorPopup";
import { useUserInfo } from "../../../store/useUserInfo";
import TopNumber from "../../../components/Join/TopNumber";
import Typography from "../../../components/Common/Layouts/Typography";
import { AxiosError } from "axios";

export default function InputEmail() {
	const [isDuplicate, setIsDuplicate] = useState(false);
	const [isNextPage, setIsNextPage] = useState(false);
	const navigate = useNavigate();
	// const { email, setEmail } = useUserInfo();
	const email = localStorage.getItem("email");

	const handleEmailVal = (val: string) => {
		localStorage.setItem("email", val);

		val.length > 8 ? setIsNextPage(true) : setIsNextPage(false);
	};

	const sendEmail = async () => {
		try {
			const res = await API.get(`/api/v1/user/check/email/${email}@sangmyung.kr`);
			if (res.data.data === "available") {
				navigate("/inputcode", { state: { userEmail: email } });
				return;
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				if (!error.response) return;

				if (error.response.data.error.code === 40901) {
					setIsDuplicate(true);
					return;
				}
			}
		}
	};

	return (
		<>
			<CS.Header backgroundColor="White">
				<HeaderMenu />
			</CS.Header>
			<TopNumber page={1} />
			<Typography typoSize="H3" color="Gray800" style={{ marginTop: "16px", marginBottom: "40px" }}>
				{`재학생 인증을 위해\n학교 이메일 주소를 입력해 주세요`}
			</Typography>
			<TextFields
				fixedText={"@sangmyung.kr"}
				maxLength={9}
				placeholder={"학번"}
				onChange={(val) => handleEmailVal(val)}
			/>
			<Button text={"인증 메일 받기"} onClick={() => sendEmail()} isNextPage={isNextPage} />
			<ErrorPopup
				message={`이미 가입된 이메일 주소에요`}
				bottom={`18.72`}
				setShowPopup={setIsDuplicate}
				isShowPopup={isDuplicate}
			/>
		</>
	);
}
