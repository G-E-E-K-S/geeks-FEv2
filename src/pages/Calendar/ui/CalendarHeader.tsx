import Typography from "../../../components/Common/Layouts/Typography";
import styled from "styled-components";
import { Dayjs } from "dayjs";
import Row from "../../../components/Common/Layouts/Row";
import { Calendar } from "../utils/types";
import { useCalendarStore } from "../../../store/calendarStore";

import RightArrowIcon from "../.././../assets/img/Calendar/RightArrowIcon.svg";
import LeftArrowIcon from "../.././../assets/img/Calendar/LeftArrowIcon.svg";
import DownArrowIcon from "../.././../assets/img/Calendar/DownArrowIcon.svg";
interface CalendarHeaderProps {
	type: Calendar;
	toggleIsOpen?: () => void;
}

export default function CalendarHeader({ type, toggleIsOpen }: CalendarHeaderProps) {
	const { currentDate, handlePrevMonth, handleNextMonth, handleTodayClick } = useCalendarStore();

	return (
		<CalendarHeaderWrapper $type={type}>
			{type === "calendar" && (
				<>
					<Row verticalAlign="center" gap={4} onClick={toggleIsOpen}>
						<Typography typoSize="H3" color="Gray800">
							{currentDate.format("YYYY.M")}
						</Typography>
						<Button>
							<img src={DownArrowIcon} />
						</Button>
					</Row>
					<Button onClick={handleTodayClick}>
						<Typography typoSize="B1_semibold" color="Gray800">
							오늘
						</Typography>
					</Button>
				</>
			)}
			{type === "modal" && (
				<>
					<Button onClick={handlePrevMonth}>
						<img src={LeftArrowIcon} />
					</Button>
					<Typography typoSize="T3_semibold" color="Gray800">
						{currentDate.format("YYYY.M")}
					</Typography>
					<Button onClick={handleNextMonth}>
						<img src={RightArrowIcon} />
					</Button>
				</>
			)}
			{type === "home" && (
				<>
					<Row verticalAlign="center" horizonAlign="distribute" width="w-full">
						<Typography typoSize="H3" color="Gray800">
							{currentDate.format("YYYY.M")}
						</Typography>
						<img src={RightArrowIcon} />
					</Row>
				</>
			)}
		</CalendarHeaderWrapper>
	);
}

const CalendarHeaderWrapper = styled.div<{ $type: Calendar }>`
	display: flex;
	align-items: center;
	${({ $type }) => {
		switch ($type) {
			case "calendar":
				return `
          justify-content: space-between;
          margin-bottom: 16px;
          gap: 0;
          padding: 12px 0;
        `;
			case "modal":
				return `
          justify-content: center;
          margin-bottom: 36px;
          gap: 12px;
        `;
			case "home":
				return `
          justify-content: space-between;
          margin-bottom: 20px;
        `;
			default:
				return `
          justify-content: center;
          margin-bottom: 10px;
        `;
		}
	}}
`;

const Button = styled.button`
	border: none;
	cursor: pointer;
	padding: 0;
	display: flex;
	background-color: transparent;
`;
