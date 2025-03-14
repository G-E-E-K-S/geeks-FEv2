import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import API from "../../../axios/BaseUrl";
import * as CS from "../../../components/Common/CommonStyle";
import HeaderMenu from "../../../components/Common/HeaderMenu";
import ErrorPopup from "../../../components/Common/ErrorPopup";
import TextFields from "../../../components/DesignStuff/TextFields/TextFields";
import Button from "../../../components/DesignStuff/Button/Button";
import { useUserInfo } from "../../../store/useUserInfo";
import TopNumber from "../../../components/Join/TopNumber";
import Typography from "../../../components/Common/Layouts/Typography";
import { debounce } from "lodash";

const NickName = () => {
	const [isNextPage, setIsNextPage] = useState(false);
	const [isPopup, setIsPopup] = useState(false);
	const [errorPopup, setErrorPopup] = useState(false);
	const letterCnt = useRef(0);
	const [debouncedNickname, setDebouncedNickname] = useState("");
	const navigate = useNavigate();
	// const { nickname, setNickname } = useUserInfo();
	const [nickname,setNickname] = useState('');

	useEffect(() => {
		const debouncedUpdate = debounce(() => {
			setDebouncedNickname(nickname);
		}, 300);

		debouncedUpdate();

		return () => debouncedUpdate.cancel();
	}, [nickname]);

	const { data: userNickName } = useQuery({
		queryKey: ["useNickName", debouncedNickname],
		queryFn: async () => {
			const res = await API.get(`/api/v1/user/check/nickname/` + debouncedNickname);
			return res.data;
		},
		enabled: debouncedNickname !== "",
		retry: 0
	});

	useEffect(() => {
		setNickname("");
	}, []);

	useEffect(() => {
		const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;
		const length = nickname.length;
		letterCnt.current = length;
		const regexTest = regex.test(nickname);

		if (!userNickName) return;

		if (length > 0 && regexTest && userNickName?.data === "available") {
			setIsNextPage(true);
			setIsPopup(false);
			setErrorPopup(false);
		} else {
			setIsNextPage(false);
			if (length > 0 && regexTest) {
				setIsPopup(true);
			} else {
				setErrorPopup(true);
			}
		}
	}, [userNickName]);

	return (
		<>
			<CS.Header backgroundColor="White">
				<HeaderMenu />
			</CS.Header>
			<TopNumber page={4} />
			<Typography typoSize="H3" color="Gray800" style={{ marginTop: "16px", marginBottom: "40px" }}>
				{`회원님을 표현할\n닉네임을 알려주세요`}
			</Typography>
			<TextFields maxLength={8} onChange={(val) => setNickname(val)} inputLen={nickname.length} totalNum={8} />
			<ErrorPopup
				message={`이미 사용 중인 닉네임이에요`}
				setShowPopup={setIsPopup}
				isShowPopup={isPopup}
				bottom={"47"}
			/>

			<ErrorPopup
				message={`닉네임은 한글 / 숫자 / 영어만 입력이 가능해요`}
				setShowPopup={setErrorPopup}
				isShowPopup={errorPopup}
				bottom={"18.72"}
			/>
			<Button text={"다음"} onClick={() => {
				localStorage.setItem('nickname',nickname);
				navigate("/questiontext");
			}} isNextPage={isNextPage} />
		</>
	);
};

export default NickName;
