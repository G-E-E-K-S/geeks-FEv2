import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import API from "../../../axios/BaseUrl";
import * as CS from "../../../components/Common/CommonStyle";
import BedIcon from "../../../assets/gif/bed.gif";
import Button from "../../../components/DesignStuff/Button/Button";
import Typography from "../../../components/Common/Layouts/Typography";
import Row from "../../../components/Common/Layouts/Row";
import { useUserInfo } from "../../../store/useUserInfo";
import { useEffect } from "react";
import { useAgreeStore } from "../../../store/useAgreeStore";

export default function FinalPage() {
	const navigate = useNavigate();
	// const { email, password, nickname, major, studentNum, dormitory, gender } = useUserInfo();
	const email = localStorage.getItem('email');
	const password = localStorage.getItem('password');
	const nickname = localStorage.getItem('nickname');
	const major = localStorage.getItem('major');
	const studentNum = localStorage.getItem('studentNum');
	const dormitory = localStorage.getItem('dormitory');
	const gender = localStorage.getItem('gender');
	const { resetAll } = useAgreeStore();
	const { refetch } = useQuery({
		queryKey: ["sendInfo"],
		queryFn: async () => {
			const res = await API.post(`/api/v1/user/signup`, {
				email: email + "@sangmyung.kr",
				password,
				nickname,
				major,
				studentNum,
				dormitory,
				gender
			});
			return res.data;
		},
		enabled: false
	});

	const sendEveryInfo = () => {
		refetch().then((val) => {
			if (val.data.success) {
				localStorage.clear();
				localStorage.setItem("token", val.data.data);
				navigate("/home", { replace: true });
			}
		});
	};

	useEffect(() => {
		resetAll();
	}, []);

	return (
		<>
			<Typography typoSize="H1" color="Gray800" textAlign="center" style={{ marginTop: "14.21vh" }}>
				{"환영합니다!"}
			</Typography>
			<Typography typoSize="T3_medium" color="Gray600" textAlign="center" style={{ marginTop: "2.84vh" }}>
				{"이제부터 긱스와 함께\n행복한 기숙사 생활 해봐요"}
			</Typography>
			<Row horizonAlign="center" verticalAlign="center">
				<img style={{ width: "354px", height: "354px" }} src={BedIcon} />
			</Row>
			<Button text={"룸메이트 찾으러 가기"} onClick={() => sendEveryInfo()} isNextPage={true} />
		</>
	);
}
