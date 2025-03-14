import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as CS from "../../../components/Common/CommonStyle";
import HeaderMenu from "../../../components/Common/HeaderMenu";
import GenderBox from "../../../components/Join/GenderBox";
import Row from "../../../components/Common/Layouts/Row";
import Button from "../../../components/DesignStuff/Button/Button";
import { useUserInfo } from "../../../store/useUserInfo";
import Typography from "../../../components/Common/Layouts/Typography";

import Girl from "../../../assets/img/Join/girl.svg";
import SelectGirl from "../../../assets/img/Join/selectGirl.svg";
import Boy from "../../../assets/img/Join/man.svg";
import SelectBoy from "../../../assets/img/Join/selectMan.svg";

export default function Gender() {
	const [isNextPage, setIsNextPage] = useState(false);
	// const { gender, setGender } = useUserInfo();
	const [gender, setGender] = useState("");
	const navigate = useNavigate();

	const SelectGender = (gender: "MALE" | "FEMALE") => {
		gender === "FEMALE" ? setGender("FEMALE") : setGender("MALE");
		setIsNextPage(true);
	};

	useEffect(() => {
		setIsNextPage(Boolean(gender));
	}, []);

	return (
		<>
			<CS.Header backgroundColor="background">
				<HeaderMenu />
			</CS.Header>
			<Typography typoSize="H3" color="Gray800" style={{ marginTop: "16px", marginBottom: "40px" }}>
				{`성별을 알려주세요`}
			</Typography>
			<Row gap={10}>
				<GenderBox
					gender={"남자"}
					onClick={() => SelectGender("MALE")}
					isSelected={gender === "MALE"}
					GenderImg={Boy}
					SelectGender={SelectBoy}
				/>
				<GenderBox
					gender={"여자"}
					onClick={() => SelectGender("FEMALE")}
					isSelected={gender === "FEMALE"}
					GenderImg={Girl}
					SelectGender={SelectGirl}
				/>
			</Row>
			<Button text={"다음"} onClick={() => {
				localStorage.setItem("gender", gender);
				navigate("/dormitory");
			}} isNextPage={isNextPage} />
		</>
	);
}
