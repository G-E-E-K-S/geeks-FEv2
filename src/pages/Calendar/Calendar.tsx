import * as c from "../../components/Common/CommonStyle";
import CalendarGrid from "./components/CalendarGrid";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useCalendarStore } from "../../store/calendarStore";
import TodaySchedules from "./components/TodaySchedules";
import CalendarHeader from "./ui/CalendarHeader";
import BottomSheet from "../../components/DesignStuff/BottomSheet/BottomSheet";
import Typography from "../../components/Common/Layouts/Typography";
import { ReactComponent as CloseModal } from "../../assets/img/Join/closeModal.svg";
import { ReactComponent as AddIcon } from ".././../assets/img/Calendar/AddIcon.svg";
import Row from "../../components/Common/Layouts/Row";
import React, { useState } from "react";
import ScrollPicker from "../../components/DesignStuff/ScrollPicker/ScrollPicker";
import { MONTHS } from "./utils/const";
import { useNavigate } from "react-router-dom";
import { useCalendarSchedules } from "./hooks/useCalendarSchedules";
import Loading from "../Loading";

export default function Calendar() {
    let navigate = useNavigate();

    const {
        currentDate,
        selectedDate,
        setCurrentDate
    } = useCalendarStore();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleIsOpen = () => {
        setIsOpen(prevState => !prevState);
    };

    const { data, isLoading } = useCalendarSchedules(currentDate.year(), currentDate.month() + 1);
    if (isLoading) return <Loading />;
    const scheduleData = data?.data || [];

    const handleMonthSelect = (month: number) => {
        const newDate = currentDate.month(month - 1);
        setCurrentDate(newDate);
        setIsOpen(false);
    };

    const todayScheduleDatas = selectedDate ?
        scheduleData[selectedDate.split('.')[2]]?.schedules
        :
        scheduleData[currentDate.format("YYYY.M.D").split('.')[2]]?.schedules;

    return (
        <c.Totalframe>
            <c.ScreenComponent navigation={true}>
                <c.SubScreen>
                    <CalendarHeader
                        type="calendar"
                        toggleIsOpen={toggleIsOpen}
                    />
                    <CalendarGrid
                        type="calendar"
                        scheduleData={scheduleData}
                    />
                    <Line />
                    <TodaySchedules
                        todayScheduleDatas={todayScheduleDatas}
                    />
                    <BottomSheet isOpen={isOpen} height="45.73vh">
                        <Row horizonAlign="distribute" style={{ marginBottom: "1.25rem" }}>
                            <Typography color="Gray800" typoSize="T2_bold">
                                {"월 선택"}
                            </Typography>
                            <Button onClick={toggleIsOpen}>
                                <CloseModal />
                            </Button>
                        </Row>
                        <ScrollPicker<number, string>
                            options={MONTHS}
                            onOptionSelect={handleMonthSelect}
                            height={220}
                        />
                    </BottomSheet>
                    <ScheduleAddButton onClick={() => navigate("/schedule/add")}>
                        <AddIcon style={{ width: "20px", height: "20px" }} />
                        <Typography typoSize="T4_semibold" color="Gray700">
                            일정 추가
                        </Typography>
                    </ScheduleAddButton>
                </c.SubScreen>
            </c.ScreenComponent>
        </c.Totalframe>
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