import styled from "styled-components";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import * as c from "../../components/Common/CommonStyle";
import ScheduleHeader from "./ui/ScheduleHeader";
import * as S from "../Calendar/utils/styles/ScheduleMark.styled";
import Typography from "../../components/Common/Layouts/Typography";
import Column from "../../components/Common/Layouts/Column";
import Row from "../../components/Common/Layouts/Row";
import type { ScheduleType } from "../Calendar/utils/types";
import { formatTimeRange } from "../Calendar/utils";
import { useScheduleStore } from "../../store/scheduleStore";

import test from "../../assets/img/Home/Alarm/roommate.svg";

const scheduleTextMap: Record<ScheduleType, string> = {
	OUTING: "외출",
	SLEEPOVER: "외박",
	TOGETHER: "공동 일정",
	ETC: "기타"
};

export default function Schedule() {
	const location = useLocation();

	const { currentSchedule, formattedDate } = useScheduleStore();

	if (!currentSchedule) {
		return <Navigate to="/calendar" />;
	}

	return (
		<c.Totalframe>
			<c.ScreenComponent navigation={false}>
				<c.SubScreen>
					<ScheduleHeader pathName={location.pathname} />
					<Column>
						<S.ScheduleTypeDiv $type={currentSchedule.type}>
							<S.ScheduleMark $type={currentSchedule.type} />
							<Typography typoSize="B2_medium">{scheduleTextMap[currentSchedule.type]}</Typography>
						</S.ScheduleTypeDiv>
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
		</c.Totalframe>
	);
}

const UserImage = styled.img`
    width: 20px;
    height: 20px;
`;
