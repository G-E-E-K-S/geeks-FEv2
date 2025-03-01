import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Typography from "../../../components/Common/Layouts/Typography";
import Column from "../../../components/Common/Layouts/Column";
import Row from "../../../components/Common/Layouts/Row";
import {ScheduleMark} from "../utils/styles/ScheduleMark.styled";
import {useLocation, useNavigate} from "react-router-dom";
import test from "../../../assets/img/Home/Alarm/roommate.svg";
import {Schedule, ScheduleType} from "../utils/types";
import {formatTimeRange} from "../utils";

interface TodaySchedulesProps {
    selectedDate: string | null;
    todayScheduleDatas: Schedule[];
}

export default function TodaySchedules({selectedDate, todayScheduleDatas}: TodaySchedulesProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const date = selectedDate ? dayjs(selectedDate).locale("ko") : dayjs().locale("ko");
    const formattedDate = `${date.format("M.D")} ${date.format("ddd")}`;

    return (
        <TodaySchedulesContainer>
            {location.pathname !== "/home" && (
                <Typography typoSize="T3_semibold" color="Gray800">{formattedDate}</Typography>)}
            <ScheduleList>
                {todayScheduleDatas?.map((schedule, index) => (
                    <Column gap={2} key={index} onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/schedule/${schedule.roommateScheduleId}`, {state: {schedule, formattedDate}});
                    }}>
                        <Row gap={12} verticalAlign="center">
                            <Row gap={8} verticalAlign="center">
                                <ScheduleMark $type={schedule.type}/>
                                {schedule.type === "SLEEPOVER" ? (
                                    <Typography typoSize="T4_medium" color="Gray500">외박</Typography>
                                ) : (
                                    <Typography typoSize="T4_medium"
                                                color="Gray500">{formatTimeRange(schedule.startDate, schedule.endDate)}</Typography>
                                )}
                            </Row>
                            <Row gap={6} verticalAlign="center">
                                <UserImage src={test}/>
                                <Typography typoSize="B2_medium" color="Gray600">{schedule.nickname}</Typography>
                            </Row>
                        </Row>
                        <Column gap={2} style={{marginLeft: "16px"}}>
                            <Typography typoSize="T4_semibold" color="Gray800">{schedule.title}</Typography>
                            <Typography typoSize="B2_medium" color="Gray600">{schedule?.description}</Typography>
                        </Column>
                    </Column>
                ))}
            </ScheduleList>
        </TodaySchedulesContainer>
    );
}

const TodaySchedulesContainer = styled.div`
`;

const ScheduleList = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const UserImage = styled.img`
    width: 20px;
    height: 20px;
`;