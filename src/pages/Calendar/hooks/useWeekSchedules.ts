import {useQuery} from "@tanstack/react-query";
import API from "../../../axios/BaseUrl";

async function getWeekSchedules() {
    try {
        const response = await API.get(`/api/v1/roommate/calendar/schedules/week`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export function useWeekSchedules() {
    const {data, isLoading} = useQuery({
        queryKey: ["weekSchedules"],
        queryFn: getWeekSchedules,
        staleTime: 1000 * 60 * 5
    })

    return {data, isLoading};
}