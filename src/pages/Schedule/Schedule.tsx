import styled from "styled-components";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

import * as c from "../../components/Common/CommonStyle";
import ScheduleHeader from "./ui/ScheduleHeader";
import * as S from "../Calendar/utils/styles/ScheduleMark.styled";
import Typography from "../../components/Common/Layouts/Typography";
import Column from "../../components/Common/Layouts/Column";
import Row from "../../components/Common/Layouts/Row";
import type { ScheduleType } from "../Calendar/utils/types";
import { formatTimeRange } from "../Calendar/utils";
import { useScheduleStore } from "../../store/scheduleStore";
import { theme } from "../../styles/theme";
import Popup from "../../components/Common/Popup";

import test from "../../assets/img/Home/Alarm/roommate.svg";
import BellIcon from "../../assets/img/Calendar/BellIcon.svg";
import Modal from "../../components/Common/Modal";
import TrashRedIcon from "../../assets/img/Calendar/TrashRedIcon.svg";
import { useDeleteCalendar } from "./hooks/useDeleteCalendar";

const scheduleTextMap: Record<ScheduleType, string> = {
	OUTING: "외출",
	SLEEPOVER: "외박",
	TOGETHER: "공동 일정",
	ETC: "기타"
};

export default function Schedule() {
	const location = useLocation();
	const navigate = useNavigate();

	const { currentSchedule, formattedDate, setCurrentSchedule } = useScheduleStore();
	const deleteCalendar = useDeleteCalendar();
	const { scheduleId } = useParams<{ scheduleId: string }>();

	const [isDelete, setIsDelete] = useState(false);

	const handleTrashClick = async () => {
		if (!scheduleId) return;
		try {
			const response = await deleteCalendar(scheduleId);
			console.log(response);
			setCurrentSchedule(null);
			navigate("/calendar");
		} catch (e) {
			console.log("일정 삭제 실패");
		}
	};

	if (!currentSchedule) {
		return <Navigate to="/calendar" />;
	}

	return (
		<c.Totalframe>
			<c.ScreenComponent navigation={false}>
				<c.SubScreen>
					<ScheduleHeader pathName={location.pathname} onClick={() => setIsDelete(true)} />
					<Column>
						<S.ScheduleTypeDiv $type={currentSchedule.type}>
							<S.ScheduleMark $type={currentSchedule.type} />
							<Typography typoSize="B2_medium">{scheduleTextMap[currentSchedule.type]}</Typography>
						</S.ScheduleTypeDiv>
						{/*<Row horizonAlign="distribute" width="w-full">*/}
						{/*<SendNotificationButton*/}
						{/*	gap={8} verticalAlign="center"*/}
						{/*	onClick={() => setIsDeletePopup(true)}*/}
						{/*>*/}
						{/*	<img src={BellIcon} />*/}
						{/*	<Typography typoSize="T4_semibold" color="Gray700">알림 보내기</Typography>*/}
						{/*</SendNotificationButton>*/}
						{/*</Row>*/}
						<Column gap={16} style={{ margin: "24px 0 48px 0" }}>
							<Column gap={6}>
								<Row gap={6} verticalAlign="center">
									<UserImage src={test} />
									<Typography typoSize="B2_medium" color="Gray600">
										{currentSchedule.nickname}
									</Typography>
								</Row>
								<Row gap={8}>
									<Typography typoSize="T4_medium">{formattedDate}</Typography>
									{currentSchedule.type === "SLEEPOVER" ? (
										<Typography typoSize="T4_medium" color="Gray500">
											외박
										</Typography>
									) : (
										<Typography typoSize="T4_medium" color="Gray500">
											{formatTimeRange(currentSchedule.startDate, currentSchedule.endDate)}
										</Typography>
									)}
								</Row>
							</Column>
							<Column gap={6}>
								<Typography typoSize="T2_semibold" color="Gray800">
									{currentSchedule.title}
								</Typography>
								<Typography typoSize="B1_medium" color="Gray600">
									{currentSchedule?.description}
								</Typography>
							</Column>
						</Column>
						<Row gap={12}>
							<Typography typoSize="B1_medium" color="Gray400">
								알림
							</Typography>
							<Typography typoSize="B1_medium" color="Gray800">
								{"10분 전 알림"}
							</Typography>
						</Row>
					</Column>
				</c.SubScreen>
			</c.ScreenComponent>
			{isDelete && (
				<Background>
					<Modal padding={`20px`}>
						<Column gap={32}>
							<Column gap={16} verticalAlign="center" width="w-full">
								<img src={TrashRedIcon} />
								<Typography typoSize="T2_bold" color="Gray800">일정을 삭제할까요?</Typography>
							</Column>
							<Column gap={12} verticalAlign="center" width="w-full">
								<ModalChoiceBtn onClick={handleTrashClick}>
									<Typography typoSize="T3_semibold" color="Gray800">네,삭제할래요</Typography>
								</ModalChoiceBtn>
								<ChoiceNo onClick={() => setIsDelete(false)}>
									<Typography typoSize="T3_semibold" color="Gray800">아니요</Typography>
								</ChoiceNo>
							</Column>
						</Column>
					</Modal>
				</Background>
			)}
		</c.Totalframe>
	);
}

const Background = styled.div`
    background: #00000033;
    position: relative;
    z-index: 30;
`;

const ModalChoiceBtn = styled.div`
    background-color: ${theme.Yellow500};
    border-radius: 12px;
    padding: 20px;
    width: 100%;
    text-align: center;
`;

const ChoiceNo = styled.div`
    background-color: ${theme.White};
    border: 1px solid ${theme.Gray200};
    border-radius: 12px;
    text-align: center;
    width: 100%;
    padding: 20px;
`;

// const SendNotificationButton = styled(Row)`
//     padding: 12px 20px;
//     border: 1px solid ${theme.Gray300};
//     background-color: ${theme.White};
//     border-radius: 12px;
// `;

const UserImage = styled.img`
    width: 20px;
    height: 20px;
`;
