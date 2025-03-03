import styled from "styled-components";
import { theme } from "../../../styles/theme";
import Typography from "../../../components/Common/Layouts/Typography";
import { getDaysInMonth, getDaysInWeek, isPreviousMonth, isToday } from "../utils";
import Row from "../../../components/Common/Layouts/Row";
import { Dayjs } from "dayjs";
import * as S from "../utils/styles/ScheduleMark.styled";
import { Calendar, Schedule, ScheduleDay, ScheduleType } from "../utils/types";
import { useCalendarStore } from "../../../store/calendarStore";

import AddIcon from "../.././../assets/img/Calendar/AddIcon.svg";

interface DayProps {
	$isEmpty: boolean;
	$isWeekend: boolean;
	$isSunday: boolean;
	$isToday: boolean;
	$isSelected: boolean;
	$isPreviousMonth?: boolean;
	$type: Calendar;
}

interface CalendarGridProps {
	type: Calendar;
	scheduleData?: (ScheduleDay | null)[];
	onDayClick?: (day: string | number) => void;
}

const scheduleTextMap: Record<ScheduleType, string> = {
	OUTING: "외출",
	SLEEPOVER: "외박",
	TOGETHER: "공동 일정",
	ETC: "기타"
};

export default function CalendarGrid({ type, scheduleData, onDayClick }: CalendarGridProps) {
	const { currentDate, selectedDate, handleDayClick } = useCalendarStore();

	const getScheduleForDay = (day: string | number) => {
		if (day === "") return [];
		return scheduleData?.[day] ? scheduleData[day]?.schedules : [];
	};

	const handleClick = (day: string | number) => {
		if (type === "modal" && onDayClick) {
			onDayClick(day);
		} else {
			handleDayClick(day);
		}
	};

	const renderScheduleMarks = (schedules: Schedule[]) => {
		if (schedules.length >= 4) {
			return (
				<ScheduleMarkWrapper style={{ flexDirection: "column", alignItems: "center" }}>
					<Row gap={2}>
						{schedules.slice(0, 2).map((scheduleType) => (
							<S.ScheduleMark key={scheduleType.roommateScheduleId} $type={scheduleType.type} />
						))}
					</Row>
					<Row gap={2}>
						<S.ScheduleMark $type={schedules[2].type} />
						<img src={AddIcon} />
					</Row>
				</ScheduleMarkWrapper>
			);
		}

		return (
			<ScheduleMarkWrapper>
				{schedules.map((scheduleType) => (
					<S.ScheduleMark key={scheduleType.roommateScheduleId} $type={scheduleType.type} />
				))}
			</ScheduleMarkWrapper>
		);
	};

	return (
		<CalendarContainer>
			{type === "calendar" && (
				<ScheduleHeader>
					{["OUTING", "SLEEPOVER", "TOGETHER", "ETC"].map((type: any) => (
						<S.ScheduleTypeDiv key={type} $type={type}>
							<S.ScheduleMark $type={type} />
							<Typography typoSize="B2_medium">{scheduleTextMap[type]}</Typography>
						</S.ScheduleTypeDiv>
					))}
				</ScheduleHeader>
			)}
			<WeekdayHeader $type={type}>
				{["일", "월", "화", "수", "목", "금", "토"].map((day: string) => (
					<WeekdayCell key={day} $day={day}>
						<Typography typoSize="B1_medium">{day}</Typography>
					</WeekdayCell>
				))}
			</WeekdayHeader>
			<CalendarBody>
				{(type === "calendar" || type === "modal") &&
					getDaysInMonth(currentDate).map((week: (string | number)[], weekIdx: number) => (
						<Week key={`week-${weekIdx}`}>
							{week.map((day: string | number, dayIdx: number) => (
								<Day
									key={`day-${weekIdx}-${dayIdx}`}
									$isEmpty={day === ""}
									$isWeekend={dayIdx === 0 || dayIdx === 6}
									$isSunday={dayIdx === 0}
									$isToday={isToday(currentDate, day)}
									$isSelected={selectedDate === currentDate.date(Number(day)).format("YYYY.M.D")}
									$type={type}
									onClick={() => handleClick(day)}
								>
									<Typography typoSize="B1_medium">{day}</Typography>
									{type === "calendar" && scheduleData && renderScheduleMarks(getScheduleForDay(day))}
								</Day>
							))}
						</Week>
					))}
				{type === "home" && (
					<Week>
						{getDaysInWeek(currentDate).map((day: string | number, dayIdx: number) => (
							<Day
								key={`day-${dayIdx}`}
								$isEmpty={day === ""}
								$isWeekend={dayIdx === 0 || dayIdx === 6}
								$isSunday={dayIdx === 0}
								$isToday={isToday(currentDate, day)}
								$isSelected={selectedDate === currentDate.date(Number(day)).format("YYYY.M.D")}
								$type={type}
								$isPreviousMonth={isPreviousMonth(currentDate, day)}
								onClick={() => handleClick(day)}
							>
								<Typography typoSize="B1_medium">{day}</Typography>
								{type === "home" && scheduleData && renderScheduleMarks(getScheduleForDay(dayIdx))}
							</Day>
						))}
					</Week>
				)}
			</CalendarBody>
		</CalendarContainer>
	);
}

const CalendarContainer = styled.div``;

const WeekdayHeader = styled.div<{ $type: Calendar }>`
	display: flex;
	margin-bottom: ${({ $type }) => ($type === "home" ? "20px" : "36px")};
	justify-content: space-between;
`;

const WeekdayCell = styled.div<{ $day: string }>`
	min-width: 38px;
	text-align: center;
	color: ${({ $day }) => {
		switch ($day) {
			case "토":
				return theme.Gray500;
			case "일":
				return theme.Red300;
			default:
				return theme.Gray600;
		}
	}};
`;

const CalendarBody = styled.div``;

const Week = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 12px;
`;

const Day = styled.div<DayProps>`
	position: relative;
	z-index: 1;
	min-width: 38px;
	min-height: 48px;
	text-align: center;
	padding: 0 5px 0;
	color: ${(props) => {
		if (props.$type === "calendar" && props.$isSelected) {
			return theme.White;
		} else if ((props.$type === "calendar" || props.$type === "home") && props.$isToday) {
			return theme.Yellow700;
		} else if (props.$isWeekend) {
			return props.$isSunday ? theme.Red500 : theme.Gray500;
		}
		return theme.Gray800;
	}};
	opacity: ${(props) => (props.$isPreviousMonth ? 0.3 : 1)};

	${(props) =>
		!props.$isEmpty &&
		props.$isSelected &&
		props.$type === "calendar" &&
		`
        &::after {
            content: "";
            position: absolute;
            top: -1px;
            left: 50%;
            transform: translateX(-50%);
            width: 26px;
            height: 26px;
            background-color: ${theme.Gray800};
            border-radius: 6px;
            z-index: -1;
        }
    `}

	${(props) =>
		!props.$isEmpty &&
		props.$type === "modal" &&
		`
        &:active::after {
            content: "";
            position: absolute;
            top: -6px;
            left: 50%;
            transform: translateX(-50%);
            width: 36px;
            height: 36px;
            background-color: ${theme.Gray50};
            border-radius: 8px;
            z-index: -1;
        }
    `}
`;

const ScheduleHeader = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin-bottom: 24px;
`;

const ScheduleMarkWrapper = styled.div`
	display: flex;
	gap: 2px;
	justify-content: center;
	margin-top: 6px;
`;
