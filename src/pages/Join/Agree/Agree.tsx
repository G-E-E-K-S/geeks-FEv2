import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as S from "./style";
import * as CS from "../../../components/Common/CommonStyle";
import Button from "../../../components/DesignStuff/Button/Button";
import HeaderMenu from "../../../components/Common/HeaderMenu";
import Typography from "../../../components/Common/Layouts/Typography";
import Row from "../../../components/Common/Layouts/Row";
import Column from "../../../components/Common/Layouts/Column";

import Check from "../../../assets/img/Join/agreeCheck.svg";
import FillCheck from "../../../assets/img/Join/agreeFillCheck.svg";

export default function Agree() {
	const navigate = useNavigate();
	const [checkedItems, setCheckedItems] = useState({
		total: false,
		service: false,
		personal: false,
		location: false,
		marketing: false
	});

	const handleCheckAll = () => {
		const newState = {
			total: true,
			service: true,
			personal: true,
			location: true,
			marketing: true
		};
		setCheckedItems(newState);
	};

	const handleCheckItem = (key) => {
		const newState = { ...checkedItems, [key]: !checkedItems[key] };

		newState.total = newState.service && newState.personal && newState.location && newState.marketing;

		setCheckedItems(newState);
	};

	const handleNextPage = () => {
		navigate("/inputemail");
	};

	return (
		<>
			<CS.Header backgroundColor="White">
				<HeaderMenu />
			</CS.Header>
			<Typography typoSize="H3" color="Gray800" style={{ marginTop: "16px", marginBottom: "40px" }}>
				{`편리한 이용을 위해\n아래 약관에 동의해 주세요`}
			</Typography>
			<S.AgreeTotal
				gap={8}
				verticalAlign="center"
				isTotalCheck={checkedItems.total}
				onClick={() => handleCheckAll()}
			>
				<img src={checkedItems.total ? FillCheck : Check} />
				<Typography typoSize="B1_semibold" color="Gray800">{`전체 동의하기`}</Typography>
				<Typography typoSize="B2_medium" color="Gray500">{`선택 동의 포함`}</Typography>
			</S.AgreeTotal>
			<Column gap={24}>
				<Row gap={8}>
					<img src={checkedItems.service ? FillCheck : Check} onClick={() => handleCheckItem("service")} />
					<Typography typoSize="B1_semibold" color="Red500">{`필수`}</Typography>
					<S.AgreeText onClick={() => navigate("/servicetxt")}>{`서비스 이용 약관`}</S.AgreeText>
				</Row>
				<Row gap={8}>
					<img src={checkedItems.personal ? FillCheck : Check} onClick={() => handleCheckItem("personal")} />
					<Typography typoSize="B1_semibold" color="Red500">{`필수`}</Typography>
					<S.AgreeText onClick={() => navigate("/personalinfotxt")}>{`개인정보 수집 및 이용`}</S.AgreeText>
				</Row>
				<Row gap={8}>
					<img src={checkedItems.location ? FillCheck : Check} onClick={() => handleCheckItem("location")} />
					<Typography typoSize="B1_semibold" color="Red500">{`필수`}</Typography>
					<S.AgreeText onClick={() => navigate("/locationtxt")}>{`위치정보 수집 및 이용`}</S.AgreeText>
				</Row>
				<Row gap={8}>
					<img
						src={checkedItems.marketing ? FillCheck : Check}
						onClick={() => handleCheckItem("marketing")}
					/>
					<Typography typoSize="B1_semibold" color="Gray500">{`선택`}</Typography>
					<S.AgreeText onClick={() => navigate("/marketingtxt")}>{`마케팅 정보 수신 동의`}</S.AgreeText>
				</Row>
			</Column>
			<Button
				text={"동의하기"}
				isNextPage={checkedItems.service && checkedItems.personal && checkedItems.location}
				onClick={() => handleNextPage()}
			/>
		</>
	);
}
