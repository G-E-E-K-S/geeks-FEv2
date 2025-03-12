import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import * as CS from "../../../components/Common/CommonStyle";
import HeaderMenu from "../../../components/Common/HeaderMenu";
import DormitoryBox from "../../../components/Join/DormitoryBox";
import Button from "../../../components/DesignStuff/Button/Button";
import Typography from "../../../components/Common/Layouts/Typography";
import { useUserInfo } from "../../../store/useUserInfo";
import { useState } from "react";

const DormitoryTotal = styled.div`
    margin-top: 6.16vh;

    & > :last-child {
        margin-bottom: 0px;
    }
`;

const Dormitory = () => {
	// const { gender, dormitory, setDormitory } = useUserInfo();
	const [dormitory, setDormitory] = useState("");
	const gender = localStorage.getItem("gender");
	const navigate = useNavigate();

	const SelectDormitory = (dormitory: string) => {
		const dormitoryType = dormitory === "신관" ? "NEW" : dormitory === "구관" ? "OLD" : "HAPPY";
		setDormitory(dormitoryType);
	};

	return (
		<>
			<CS.Header backgroundColor="White">
				<HeaderMenu />
			</CS.Header>
			<Typography typoSize="H3" color="Gray800" style={{ marginTop: "16px", marginBottom: "40px" }}>
				{`어떤 기숙사에서 생활하시나요?`}
			</Typography>
			<DormitoryTotal>
				<DormitoryBox
					disable={false}
					dormitory={"신관"}
					onClick={() => SelectDormitory("신관")}
					isSelected={dormitory == "NEW"}
				/>
				<DormitoryBox
					disable={gender == "MALE"}
					dormitory={"구관"}
					onClick={() => SelectDormitory("구관")}
					isSelected={dormitory == "OLD"}
				/>
				<DormitoryBox
					disable={false}
					dormitory={"천안 행복기숙사"}
					onClick={() => SelectDormitory("천안 행복기숙사")}
					isSelected={dormitory == "HAPPY"}
				/>
			</DormitoryTotal>
			<Button text={"다음"} onClick={() => {
				localStorage.setItem("dormitory", dormitory);
				navigate("/finalpage");
			}} isNextPage={Boolean(dormitory)} />
		</>
	);
};

export default Dormitory;
