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
import { useAgreeStore } from "../../../store/useAgreeStore";

export default function Agree() {
	const navigate = useNavigate();
	const { total, service, personal, location, marketing, toggleAll, toggleItem } = useAgreeStore();

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
			<S.AgreeTotal gap={8} verticalAlign="center" isTotalCheck={total} onClick={toggleAll}>
				<img src={total ? FillCheck : Check} />
				<Typography typoSize="B1_semibold" color="Gray800">{`전체 동의하기`}</Typography>
				<Typography typoSize="B2_medium" color="Gray500">{`선택 동의 포함`}</Typography>
			</S.AgreeTotal>
			<Column gap={24}>
				<Row gap={8}>
					<img src={service ? FillCheck : Check} onClick={() => toggleItem("service")} />
					<Typography typoSize="B1_semibold" color="Red500">{`필수`}</Typography>
					<S.AgreeText onClick={() => navigate("/servicetxt")}>{`서비스 이용 약관`}</S.AgreeText>
				</Row>
				<Row gap={8}>
					<img src={personal ? FillCheck : Check} onClick={() => toggleItem("personal")} />
					<Typography typoSize="B1_semibold" color="Red500">{`필수`}</Typography>
					<S.AgreeText onClick={() => navigate("/personalinfotxt")}>{`개인정보 수집 및 이용`}</S.AgreeText>
				</Row>
				<Row gap={8}>
					<img src={location ? FillCheck : Check} onClick={() => toggleItem("location")} />
					<Typography typoSize="B1_semibold" color="Red500">{`필수`}</Typography>
					<S.AgreeText onClick={() => navigate("/locationtxt")}>{`위치정보 수집 및 이용`}</S.AgreeText>
				</Row>
				<Row gap={8}>
					<img src={marketing ? FillCheck : Check} onClick={() => toggleItem("marketing")} />
					<Typography typoSize="B1_semibold" color="Gray500">{`선택`}</Typography>
					<S.AgreeText onClick={() => navigate("/marketingtxt")}>{`마케팅 정보 수신 동의`}</S.AgreeText>
				</Row>
			</Column>
			<Button text={"동의하기"} isNextPage={service && personal && location} onClick={() => handleNextPage()} />
		</>
	);
}
