import {ScheduleMark} from "../../../Calendar/utils/styles/ScheduleMark.styled";
import styled from "styled-components";
import {ScheduleType} from "../../../Calendar/utils/types";
import {ReactNode} from "react";

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
`;

export const TYPES: { id: ScheduleType, option: ReactNode }[] = [
    {id: "OUTING", option: <StyledDiv><ScheduleMark $type="OUTING"/>외출</StyledDiv>},
    {id: "SLEEPOVER", option: <StyledDiv><ScheduleMark $type="SLEEPOVER"/>외박</StyledDiv>},
    {id: "TOGETHER", option: <StyledDiv><ScheduleMark $type="TOGETHER"/>공동 일정</StyledDiv>},
    {id: "ETC", option: <StyledDiv><ScheduleMark $type="ETC"/>기타</StyledDiv>}
];

export const ALARMS = [
    {id: 0, option: "없음"},
    {id: 1, option: "10분 전 알림"},
    {id: 2, option: "20분 전 알림"},
    {id: 3, option: "30분 전 알림"},
    {id: 4, option: "40분 전 알림"},
    {id: 5, option: "50분 전 알림"},
    {id: 6, option: "1시간 전 알림"}
];

export const TIMES = Array.from({length: 48}, (_, i) => {
    const hours = String(Math.floor(i / 2)).padStart(2, "0");
    const minutes = i % 2 === 0 ? "00" : "30";
    return {id: i, option: `${hours}:${minutes}`};
});

export const HOURS = Array.from({length: 24}, (_, i) => ({
    id: i,
    option: String(i).padStart(2, "0"),
}));

export const MINUTES = Array.from({length: 12}, (_, i) => ({
    id: i,
    option: String(i * 5).padStart(2, "0"),
}));