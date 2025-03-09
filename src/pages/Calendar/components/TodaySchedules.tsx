import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Typography from "../../../components/Common/Layouts/Typography";
import Column from "../../../components/Common/Layouts/Column";
import Row from "../../../components/Common/Layouts/Row";
import { ScheduleMark } from "../utils/styles/ScheduleMark.styled";
import { useLocation, useNavigate } from "react-router-dom";
import { Schedule } from "../utils/types";
import { formatTimeRange } from "../utils";
import { useCalendarStore } from "../../../store/calendarStore";
import { useScheduleStore } from "../../../store/scheduleStore";
import Profile from "../../../assets/img/MyPage/basicProfile.svg";

interface TodaySchedulesProps {
	todayScheduleDatas: Schedule[];
}

export default function TodaySchedules({ todayScheduleDatas }: TodaySchedulesProps) {
	const navigate = useNavigate();
	const location = useLocation();
	const { selectedDate } = useCalendarStore();
	const { setCurrentSchedule, setFormattedDate } = useScheduleStore();

	const date = selectedDate ? dayjs(selectedDate).locale("ko") : dayjs().locale("ko");
	const formattedDate = `${date.format("M.D")} ${date.format("ddd")}`;

	const handleScheduleClick = (schedule: Schedule) => {
		setCurrentSchedule(schedule);
		setFormattedDate(formattedDate);
		navigate(`/schedule/${schedule.roommateScheduleId}`);
	};

	return (
		<TodaySchedulesContainer>
			{location.pathname !== "/home" && (
				<Typography typoSize="T3_semibold" color="Gray800">
					{formattedDate}
				</Typography>
			)}
			<ScheduleList>
				{todayScheduleDatas?.map((schedule, index) => (
					<Column
						gap={2}
						key={index}
						onClick={(e) => {
							e.stopPropagation();
							handleScheduleClick(schedule);
						}}
					>
						<Row gap={12} verticalAlign="center">
							<Row gap={8} verticalAlign="center">
								<ScheduleMark $type={schedule.type} />
								{schedule.type === "SLEEPOVER" ? (
									<Typography typoSize="T4_medium" color="Gray500">
										외박
									</Typography>
								) : (
									<Typography typoSize="T4_medium" color="Gray500">
										{formatTimeRange(schedule.startDate, schedule.endDate)}
									</Typography>
								)}
							</Row>
							<Row gap={6} verticalAlign="center">
								<UserImage
									src={schedule?.image ? import.meta.env.VITE_APP_BUCKET_BASEURL + schedule.image : Profile} />
								<Typography typoSize="B2_medium" color="Gray600">
									{schedule.nickname}
								</Typography>
							</Row>
						</Row>
						<Column gap={2} style={{ marginLeft: "16px" }}>
							<Typography typoSize="T4_semibold" color="Gray800">
								{schedule.title}
							</Typography>
							<Typography typoSize="B2_medium" color="Gray600">
								{schedule?.description}
							</Typography>
						</Column>
					</Column>
				))}
			</ScheduleList>
		</TodaySchedulesContainer>
	);
}

const TodaySchedulesContainer = styled.div``;

const ScheduleList = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const UserImage = styled.img`
    width: 20px;
    height: 20px;
    border-radius: 50%;
`;
