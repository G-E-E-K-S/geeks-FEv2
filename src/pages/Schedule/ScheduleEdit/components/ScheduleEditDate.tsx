import React, { useState } from "react";
import Typography from "../../../../components/Common/Layouts/Typography";
import Row from "../../../../components/Common/Layouts/Row";
import { HOURS, MINUTES, TIMES } from "../../util/const";
import Column from "../../../../components/Common/Layouts/Column";
import { SelectInput } from "../../util/styles";
import CalendarHeader from "../../../Calendar/ui/CalendarHeader";
import CalendarGrid from "../../../Calendar/components/CalendarGrid";
import BottomSheet from "../../../../components/DesignStuff/BottomSheet/BottomSheet";
import styled from "styled-components";
import { theme } from "../../../../styles/theme";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useCalendarStore } from "../../../../store/calendarStore";
import CloseModalIcon from "../../../../assets/img/Join/closeModal.svg";
import dayjs from "dayjs";

interface ScheduleEditDateProps {
	startDate: string;
	endDate: string;
	startTime: string;
	endTime: string;
	type: string;
	setStartDate: (startDate: string) => void;
	setStartTime: (startTime: string) => void;
	setEndDate: (EndDate: string) => void;
	setEndTime: (endTime: string) => void;
}

export default function ScheduleEditDate({
											 startDate,
											 endDate,
											 startTime,
											 endTime,
											 type,
											 setStartDate,
											 setStartTime,
											 setEndDate,
											 setEndTime
										 }: ScheduleEditDateProps) {
	const { currentDate, handleDayClick } = useCalendarStore();

	const [isStartTimeOpen, setIsStartTimeOpen] = useState(false);
	const [isEndTimeOpen, setIsEndTimeOpen] = useState(false);
	const [isStartDateOpen, setIsStartDateOpen] = useState(false);
	const [isEndDateOpen, setIsEndDateOpen] = useState(false);
	const [selectedHour, setSelectedHour] = useState(HOURS[0].option);
	const [selectedMinute, setSelectedMinute] = useState(MINUTES[0].option);

	const handleDateClick = (day: string | number) => {
		if (day === "") return;
		const selectedDate = currentDate.date(Number(day)).format("YYYY.M.D");
		const selectedMoment = dayjs(selectedDate, "YYYY.M.D");

		if (isStartDateOpen) {
			const endMoment = dayjs(endDate, "YYYY.M.D");

			setStartDate(selectedDate);
			if (selectedMoment.isAfter(endMoment)) {
				setEndDate(selectedDate);
			}
			setIsStartDateOpen(false);
		} else if (isEndDateOpen) {
			const startMoment = dayjs(startDate, "YYYY.M.D");

			if (selectedMoment.isBefore(startMoment)) {
				setStartDate(selectedDate);
			}
			setEndDate(selectedDate);
			setIsEndDateOpen(false);
		}
	};

	const handleTimeClick = () => {
		const time = `${selectedHour}:${selectedMinute}`;
		const selectedTimeMoment = dayjs(`2000-01-01 ${time}`);

		if (isStartTimeOpen) {
			const endTimeMoment = dayjs(`2000-01-01 ${endTime}`);

			setStartTime(time);
			if (selectedTimeMoment.isAfter(endTimeMoment) && startDate === endDate) {
				setEndTime(time);
			}
			setIsStartTimeOpen(false);
		} else if (isEndTimeOpen) {
			const startTimeMoment = dayjs(`2000-01-01 ${startTime}`);

			if (selectedTimeMoment.isBefore(startTimeMoment) && startDate === endDate) {
				setStartTime(time);
			}
			setEndTime(time);
			setIsEndTimeOpen(false);
		}
	};

	return (
		<>
			<Column gap={8} width="w-full">
				<Typography typoSize="B2_medium" color="Gray500">
					날짜
				</Typography>
				<Row gap={9.5} horizonAlign="center" verticalAlign="center" width="w-full">
					<SelectInput onClick={() => setIsStartDateOpen(true)} style={{ width: "33.215%" }}>
						<Typography
							typoSize="T3_semibold"
							color="Gray800"
							style={{ display: "flex", alignItems: "center", gap: "6px" }}
						>
							{startDate}
						</Typography>
					</SelectInput>
					<SelectInput
						onClick={() => type !== "SLEEPOVER" && setIsStartTimeOpen(true)}
						style={{ width: "19.37%" }}
					>
						<Typography
							typoSize="T3_semibold"
							color={type === "SLEEPOVER" ? "Gray200" : "Gray800"}
							style={{ display: "flex", alignItems: "center", gap: "6px" }}
						>
							{TIMES[startTime]?.option ?? startTime}
						</Typography>
					</SelectInput>
					<Typography typoSize="B1_semibold" color="Gray800">
						-
					</Typography>
					<SelectInput onClick={() => setIsEndDateOpen(true)} style={{ width: "33.215%" }}>
						<Typography
							typoSize="T3_semibold"
							color="Gray800"
							style={{ display: "flex", alignItems: "center", gap: "6px" }}
						>
							{endDate}
						</Typography>
					</SelectInput>
					<SelectInput
						onClick={() => type !== "SLEEPOVER" && setIsEndTimeOpen(true)}
						style={{ width: "19.37%" }}
					>
						<Typography
							typoSize="T3_semibold"
							color={type === "SLEEPOVER" ? "Gray200" : "Gray800"}
							style={{ display: "flex", alignItems: "center", gap: "6px" }}
						>
							{TIMES[endTime]?.option ?? endTime}
						</Typography>
					</SelectInput>
				</Row>
			</Column>

			{/*날짜 선택 모달*/}
			<BottomSheet isOpen={isStartDateOpen || isEndDateOpen} height="65.16vh">
				<Row horizonAlign="distribute" style={{ marginBottom: "1.25rem" }}>
					<Typography color="Gray800" typoSize="T2_bold">
						날짜
					</Typography>
					<CloseButton
						onClick={() => {
							setIsStartDateOpen(false);
							setIsEndDateOpen(false);
						}}
					>
						<img src={CloseModalIcon} />
					</CloseButton>
				</Row>
				<CalendarHeader type="modal" />
				<CalendarGrid type="modal" onDayClick={handleDateClick} />
			</BottomSheet>

			{/*시간 선택 모달*/}
			<BottomSheet isOpen={isStartTimeOpen || isEndTimeOpen} height="54.73vh">
				<Row horizonAlign="distribute" style={{ marginBottom: "1.25rem" }}>
					<Typography color="Gray800" typoSize="T2_bold">
						시간
					</Typography>
					<CloseButton
						onClick={() => {
							setIsStartTimeOpen(false);
							setIsEndTimeOpen(false);
						}}
					>
						<img src={CloseModalIcon} />
					</CloseButton>
				</Row>
				<Row horizonAlign="center" verticalAlign="center">
					<Swiper
						style={{ height: "220px" }}
						direction={"vertical"}
						slidesPerView={3}
						slideToClickedSlide={true}
						centeredSlides={true}
						onSlideChange={(swiper) => {
							setSelectedHour(HOURS[swiper.realIndex].option);
						}}
					>
						{HOURS.map((no) => (
							<SwiperSlide key={no.option} style={{ display: "flex", alignItems: "center" }}>
								<Typography typoSize="T1" color="Gray700" textAlign="center">
									{no.option}
								</Typography>
							</SwiperSlide>
						))}
					</Swiper>
					<Typography typoSize="T1" color="Gray700" style={{ height: "35px" }}>
						:
					</Typography>
					<Swiper
						style={{ height: "220px" }}
						direction={"vertical"}
						slidesPerView={3}
						slideToClickedSlide={true}
						centeredSlides={true}
						onSlideChange={(swiper) => {
							setSelectedMinute(MINUTES[swiper.realIndex].option);
						}}
					>
						{MINUTES.map((no) => (
							<SwiperSlide key={no.option} style={{ display: "flex", alignItems: "center" }}>
								<Typography typoSize="T1" color="Gray700" textAlign="center">
									{no.option}
								</Typography>
							</SwiperSlide>
						))}
					</Swiper>
				</Row>
				<Button onClick={handleTimeClick}>
					<Typography typoSize="T3_semibold" color="Gray800">
						확인
					</Typography>
				</Button>
			</BottomSheet>
		</>
	);
}

const CloseButton = styled.button`
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
`;

// 합치고 버튼 바꿔
const Button = styled.button`
    margin-top: 20px;
    border: none;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    background-color: ${theme.Yellow500};
    padding: 20px 0;
    border-radius: 12px;
    width: 100%;
`;
