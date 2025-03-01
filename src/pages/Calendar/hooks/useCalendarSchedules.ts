import {useQuery} from "@tanstack/react-query";
import API from "../../../axios/BaseUrl";

async function getCalendarSchedules(year, month) {
    try {
        const response = await API.get(`/api/v1/roommate/calendar/schedules/${year}/${month}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export function useCalendarSchedules(year, month) {
    const {data, isLoading} = useQuery({
        queryKey: ["calendarSchedules", year, month],
        queryFn: () => getCalendarSchedules(year, month),
        staleTime: 1000 * 60 * 5
    })

    return {data, isLoading};
}