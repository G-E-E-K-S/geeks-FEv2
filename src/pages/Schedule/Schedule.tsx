import React from "react";
import * as c from "../../components/Common/CommonStyle";
import ScheduleHeader from "./ui/ScheduleHeader";
import {Navigate, useLocation} from "react-router-dom";
import * as S from "../Calendar/utils/styles/ScheduleMark.styled";
import Typography from "../../components/Common/Layouts/Typography";
import Column from "../../components/Common/Layouts/Column";
import Row from "../../components/Common/Layouts/Row";
import type {Schedule, ScheduleType} from "../Calendar/utils/types";
import {formatTimeRange} from "../Calendar/utils";
import test from "../../assets/img/Home/Alarm/roommate.svg";
import styled from "styled-components";

const dummyScheduleData: Schedule = {
    "roommateScheduleId": 2,
    "title": "외출합니다",
    "startDate": "2025-02-27T15:48:00",
    "endDate": "2025-02-27T15:48:00",
    "type": "OUTING",
    "description": "외출",
    "nickname": "TEST_1",
    "writerStatus": true
}

const scheduleTextMap: Record<ScheduleType, string> = {
    OUTING: "외출",
    SLEEPOVER: "외박",
    TOGETHER: "공동 일정",
    ETC: "기타",
};

export default function Schedule() {
    const location = useLocation();
    const {schedule, formattedDate} = location.state || {};

    if (!schedule) {
        return <Navigate to="/calendar"/>;
    }

    return (
        <c.Totalframe>
            <c.ScreenComponent navigation={false}>
                <c.SubScreen>
                    <ScheduleHeader pathName={location.pathname} schedule={schedule}/>
                    <Column>
                        <S.ScheduleTypeDiv $type={schedule.type}>
                            <S.ScheduleMark $type={schedule.type}/>
                            <Typography typoSize="B2_medium">{scheduleTextMap[schedule.type]}</Typography>
                        </S.ScheduleTypeDiv>
                        <Column gap={16} style={{margin: "24px 0 48px 0"}}>
                            <Column gap={6}>
                                <Row gap={6} verticalAlign="center">
                                    <UserImage src={test}/>
                                    <Typography typoSize="B2_medium" color="Gray600">{schedule.nickname}</Typography>
                                </Row>
                                <Row gap={8}>
                                    <Typography typoSize="T4_medium">{formattedDate}</Typography>
                                    <Typography typoSize="T4_medium"
                                                color="Gray500">{formatTimeRange(schedule.startDate, schedule.endDate)}</Typography>
                                </Row>
                            </Column>
                            <Column gap={6}>
                                <Typography typoSize="T2_semibold" color="Gray800">{schedule.title}</Typography>
                                <Typography typoSize="B1_medium" color="Gray600">{schedule?.description}</Typography>
                            </Column>
                        </Column>
                        <Row gap={12}>
                            <Typography typoSize="B1_medium" color="Gray400">알림</Typography>
                            <Typography typoSize="B1_medium" color="Gray800">{"10분 전 알림"}</Typography>
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