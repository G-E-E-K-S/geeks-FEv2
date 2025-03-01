import styled from "styled-components";
import {theme} from "../../../../styles/theme";
import {ScheduleType} from "../types";

export const ScheduleMark = styled.div<{ $type: ScheduleType }>`
    width: 8px;
    height: 8px;
    border-radius: 2px;
    background-color: ${({$type}) => {
        switch ($type) {
            case "OUTING":
                return theme.Blue500;
            case "SLEEPOVER":
                return theme.Red400;
            case "TOGETHER":
                return theme.Teal300;
            case "ETC":
                return theme.YellowGray300;
            default:
                return "transparent";
        }
    }};
`;

export const ScheduleTypeDiv = styled.div<{ $type: ScheduleType }>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 6px;
    background-color: ${({$type}) => {
        switch ($type) {
            case "OUTING":
                return theme.Blue50;
            case "SLEEPOVER":
                return theme.Red50;
            case "TOGETHER":
                return theme.Teal50;
            case "ETC":
                return theme.YellowGray50;
            default:
                return "transparent";
        }
    }};
`;