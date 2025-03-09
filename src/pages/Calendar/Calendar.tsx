import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import * as c from "../../components/Common/CommonStyle";
import CalendarGrid from "./components/CalendarGrid";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useCalendarStore } from "../../store/calendarStore";
import TodaySchedules from "./components/TodaySchedules";
import CalendarHeader from "./ui/CalendarHeader";
import BottomSheet from "../../components/DesignStuff/BottomSheet/BottomSheet";
import Typography from "../../components/Common/Layouts/Typography";
import Row from "../../components/Common/Layouts/Row";
import ScrollPicker from "../../components/DesignStuff/ScrollPicker/ScrollPicker";
import { MONTHS } from "./utils/const";
import { useCalendarSchedules } from "./hooks/useCalendarSchedules";
import Loading from "../Loading";
import Popup from "../../components/Common/Popup";

import CloseModal from "../../assets/img/Join/closeModal.svg";
import AddIcon from ".././../assets/img/Calendar/AddIcon.svg";
import BlurImg from "../../assets/img/Calendar/BackgroundImg.png";
import * as S from "../FindRoommate/FindRoommate/style";
import { useScheduleStore } from "../../store/scheduleStore";

export default function Calendar() {
	let navigate = useNavigate();

	const { currentDate, selectedDate, setCurrentDate } = useCalendarStore();
	const { setCurrentSchedule } = useScheduleStore();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isDeletePopup, setIsDeletePopup] = useState(false);

	useEffect(() => {
		setCurrentSchedule(null);
	}, []);

	const { data, isLoading } = useCalendarSchedules(currentDate.year(), currentDate.month() + 1);
	if (isLoading) return <Loading />;
	const scheduleData = data?.data || [];

	const toggleIsOpen = () => {
		setIsOpen((prevState) => !prevState);
	};

	const handleMonthSelect = (month: number) => {
		const newDate = currentDate.month(month - 1);
		setCurrentDate(newDate);
		setIsOpen(false);
	};

	const todayScheduleDatas = selectedDate
		? scheduleData[selectedDate.split(".")[2]]?.schedules
		: scheduleData[currentDate.format("YYYY.M.D").split(".")[2]]?.schedules;

	return data?.data === null ? (
		<>
			<S.BlurIcon src={BlurImg} />
			<S.EnrollLifeStyle>
				<Typography typoSize={"B1_semibold"} color={"Gray800"} textAlign="center">
					{"룸메이트를 맺고\n일정 공유 캘린더를 사용해보세요!"}
				</Typography>
				<S.EnroolLifeStyleBtn
					onClick={() => navigate("/roommate")}
				>{`룸메이트 찾기`}</S.EnroolLifeStyleBtn>
			</S.EnrollLifeStyle>
		</>
	) : (
		<>
			<c.SubScreen>
				<CalendarHeader type="calendar" toggleIsOpen={toggleIsOpen} />
				<CalendarGrid type="calendar" scheduleData={scheduleData} />
				<Line />
				<TodaySchedules todayScheduleDatas={todayScheduleDatas} />
				<BottomSheet isOpen={isOpen} height="45.73vh">
					<Row horizonAlign="distribute" style={{ marginBottom: "1.25rem" }}>
						<Typography color="Gray800" typoSize="T2_bold">
							{"월 선택"}
						</Typography>
						<Button onClick={toggleIsOpen}>
							<img src={CloseModal} />
						</Button>
					</Row>
					<ScrollPicker<number, string>
						options={MONTHS}
						onOptionSelect={handleMonthSelect}
						height={220}
					/>
				</BottomSheet>
				<ScheduleAddButton onClick={() => navigate("/schedule/add")}>
					<img src={AddIcon} style={{ width: "20px", height: "20px" }} />
					<Typography typoSize="T4_semibold" color="Gray700">
						일정 추가
					</Typography>
				</ScheduleAddButton>
			</c.SubScreen>
			<Popup
				message={`일정이 삭제됐어요`}
				setShowPopup={setIsDeletePopup}
				isShowPopup={isDeletePopup}
				bottom={`18.72`}
			/>
		</>
	);
}

const Line = styled.div`
    height: 1px;
    background-color: ${theme.Gray100};
    margin-bottom: 16px;
`;

const Button = styled.button`
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
`;

const ScheduleAddButton = styled(Button)`
    z-index: 10;
    position: fixed;
    right: 20px;
    bottom: calc(11.84vh + 20px);
    border: 1px solid ${theme.Gray300};
    box-shadow: 2px 2px 8px 0 #00000014;
    border-radius: 12px;
    padding: 14px 20px;
    gap: 8px;
    background-color: ${theme.White};
`;
