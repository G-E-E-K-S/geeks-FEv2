import React, { useEffect, useState } from "react";
import * as c from "../../../components/Common/CommonStyle";
import ScheduleHeader from "../ui/ScheduleHeader";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
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

export default function ScheduleEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const { schedule } = location.state || {};

    const postCalendar = usePostCalendar();
    const putCalendar = usePutCalendar();

    const [title, setTitle] = useState("");
    const [type, setType] = useState<ScheduleType>("OUTING");
    const [alarm, setAlarm] = useState(1);
    const [explain, setExplain] = useState("");

    const [startDate, setStartDate] = useState(dayjs().format("YYYY.M.D"));
    const [startTime, setStartTime] = useState(floorToNearest30(dayjs()).format("HH:mm"));
    const [endDate, setEndDate] = useState(dayjs().format("YYYY.M.D"));
    const [endTime, setEndTime] = useState(floorToNearest30(dayjs()).format("HH:mm"));

    const [isActive, setIsActive] = useState(false);
    const [prevValues, setPrevValues] = useState({ title, type, alarm, explain });
    const isAdd = location.pathname.includes("add");

    useEffect(() => {
        if (schedule) {
            setTitle(schedule.title || "");
            setType(schedule.type || "OUTING");
            setAlarm(schedule.alarm || 1);
            setExplain(schedule.description || "");
            setStartDate(dayjs(schedule.startDate).format("YYYY.M.D"));
            setStartTime(dayjs(schedule.startDate).format("HH:mm"));
            setEndDate(dayjs(schedule.endDate).format("YYYY.M.D"));
            setEndTime(dayjs(schedule.endDate).format("HH:mm"));
            setPrevValues({
                title: schedule.title || "",
                type: schedule.type || "OUTING",
                alarm: schedule.alarm || 1,
                explain: schedule.description || ""
            });
        }
    }, [schedule]);

    useEffect(() => {
        if (schedule) {
            // schedule이 있을 때는 이전 값과 비교하여 변경되었는지 확인
            const isChanged =
                title !== prevValues.title ||
                type !== prevValues.type ||
                alarm !== prevValues.alarm ||
                explain !== prevValues.explain;
            setIsActive(isChanged);
        } else {
            // schedule이 없을 때는 title이 비어있지 않으면 active
            setIsActive(title.trim() !== "");
        }
    }, [title, type, alarm, explain, schedule, prevValues]);

    const addCalendarSchedule = async () => {
        const startDateTime = formatDateTimeForApi(startDate, startTime);
        const endDateTime = formatDateTimeForApi(endDate, endTime);

        if (schedule) {
            const roommateScheduleId = schedule.roommateScheduleId;
            const response = await putCalendar({ roommateScheduleId, title, startDateTime, endDateTime, type, explain });
            console.log(response);
        } else {
            const response = await postCalendar({ title, startDateTime, endDateTime, type, explain });
            console.log(response);
        }
        navigate("/calendar");
    }

    return (
        <c.Totalframe>
            <c.ScreenComponent navigation={false}>
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
                    <ScheduleEditAlarm alarm={alarm} setAlarm={setAlarm} />
                    <ScheduleEditExplain explain={explain} setExplain={setExplain} />
                </Column>
            </c.ScreenComponent>
        </c.Totalframe>
    );
}