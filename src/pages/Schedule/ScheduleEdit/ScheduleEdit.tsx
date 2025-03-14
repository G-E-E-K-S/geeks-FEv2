import React, { useEffect, useState } from "react";
import ScheduleHeader from "../ui/ScheduleHeader";
import { useLocation, useNavigate } from "react-router-dom";
import Column from "../../../components/Common/Layouts/Column";
import { floorToNearest30 } from "../../Calendar/utils";
import ScheduleEditTitle from "./components/ScheduleEditTitle";
import ScheduleEditType from "./components/ScheduleEditType";
import ScheduleEditAlarm from "./components/ScheduleEditAlarm";
import ScheduleEditExplain from "./components/ScheduleEditExplain";
import ScheduleEditDate from "./components/ScheduleEditDate";
import dayjs from "dayjs";
import { ScheduleType } from "../../Calendar/utils/types";
import { formatDateTimeForApi } from "../util";
import { usePostCalendar } from "../hooks/usePostCalendar";
import { usePutCalendar } from "../hooks/usePutCalendar";
import { useScheduleStore } from "../../../store/scheduleStore";
import { useCalendarStore } from "../../../store/calendarStore";

export default function ScheduleEdit() {
	const navigate = useNavigate();
	const location = useLocation();
	const { currentSchedule, setCurrentSchedule } = useScheduleStore();
	const { selectedDate } = useCalendarStore();

	const postCalendar = usePostCalendar();
	const putCalendar = usePutCalendar();

	const [title, setTitle] = useState("");
	const [type, setType] = useState<ScheduleType>("OUTING");
	const [explain, setExplain] = useState("");

	const [startDate, setStartDate] = useState(selectedDate ? dayjs(selectedDate).format("YYYY.M.D") : dayjs().format("YYYY.M.D"));
	const [startTime, setStartTime] = useState(floorToNearest30(dayjs()).format("HH:mm"));
	const [endDate, setEndDate] = useState(selectedDate ? dayjs(selectedDate).format("YYYY.M.D") : dayjs().format("YYYY.M.D"));
	const [endTime, setEndTime] = useState(floorToNearest30(dayjs()).format("HH:mm"));

	const [isActive, setIsActive] = useState(false);
	const [prevValues, setPrevValues] = useState({
		title,
		type,
		explain,
		startDate: formatDateTimeForApi(startDate, startTime),
		endDate: formatDateTimeForApi(endDate, endTime)
	});

	useEffect(() => {
		if (currentSchedule) {
			setTitle(currentSchedule.title || "");
			setType(currentSchedule.type || "OUTING");
			setExplain(currentSchedule.description || "");
			setStartDate(dayjs(currentSchedule.startDate).format("YYYY.M.D"));
			setStartTime(dayjs(currentSchedule.startDate).format("HH:mm"));
			setEndDate(dayjs(currentSchedule.endDate).format("YYYY.M.D"));
			setEndTime(dayjs(currentSchedule.endDate).format("HH:mm"));
			setPrevValues({
				title: currentSchedule.title || "",
				type: currentSchedule.type || "OUTING",
				explain: currentSchedule.description || "",
				startDate: dayjs(currentSchedule.startDate).format("YYYY-MM-DDTHH:mm"),
				endDate: dayjs(currentSchedule.endDate).format("YYYY-MM-DDTHH:mm")
			});
		}

	}, [currentSchedule]);

	useEffect(() => {
		if (currentSchedule) {
			// schedule이 있을 때는 이전 값과 비교하여 변경되었는지 확인
			const isChanged =
				title !== prevValues.title ||
				type !== prevValues.type ||
				explain !== prevValues.explain ||
				formatDateTimeForApi(startDate, startTime) !== prevValues.startDate ||
				formatDateTimeForApi(endDate, endTime) !== prevValues.endDate;
			setIsActive(isChanged);
		} else {
			// schedule이 없을 때는 title이 비어있지 않으면 active
			setIsActive(title.trim() !== "");
		}
	}, [title, type, explain, currentSchedule, prevValues, startDate, startTime, endDate, endTime]);

	const addCalendarSchedule = async () => {
		const startDateTime = formatDateTimeForApi(startDate, startTime);
		const endDateTime = formatDateTimeForApi(endDate, endTime);

		if (currentSchedule) {
			const roommateScheduleId = currentSchedule.roommateScheduleId;
			const response = await putCalendar({
				roommateScheduleId,
				title,
				startDateTime,
				endDateTime,
				type,
				explain
			});
			console.log(response);
		} else {
			const response = await postCalendar({ title, startDateTime, endDateTime, type, explain });
			console.log(response);
		}
		// 전역 상태 초기화
		setCurrentSchedule(null);
		navigate(-1);
	};

	return (
		<>
			<ScheduleHeader pathName={location.pathname} isActive={isActive} onClick={addCalendarSchedule} />
			<Column gap={40} width="w-full">
				<ScheduleEditTitle title={title} setTitle={setTitle} />
				<ScheduleEditType type={type} setType={setType} />
				<ScheduleEditDate
					startDate={startDate}
					endDate={endDate}
					startTime={startTime}
					endTime={endTime}
					type={type}
					setStartDate={setStartDate}
					setStartTime={setStartTime}
					setEndDate={setEndDate}
					setEndTime={setEndTime}
				/>
				{/*<ScheduleEditAlarm alarm={alarm} setAlarm={setAlarm} />*/}
				<ScheduleEditExplain explain={explain} setExplain={setExplain} />
			</Column>
		</>
	);
}