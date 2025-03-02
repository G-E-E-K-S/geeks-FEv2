import {useMutation, useQueryClient} from "@tanstack/react-query";
import API from "../../../axios/BaseUrl";

async function putCalendar({roommateScheduleId, title, startDateTime, endDateTime, type, explain}) {
    try {
        const response = await API.put(`/api/v1/roommate/calendar/schedules/modify`, {
            roommateScheduleId: roommateScheduleId,
            title: title,
            startDate: startDateTime,
            endDate: endDateTime,
            type: type,
            description: explain,
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export function usePutCalendar() {
    const queryClient = useQueryClient();

    const {mutateAsync} = useMutation({
        mutationFn: putCalendar,
        onSuccess: (data) => {
            console.log("Success: ", data);
            queryClient.invalidateQueries({queryKey: ["calendarSchedules"]});
            queryClient.invalidateQueries({queryKey: ["weekSchedules"]});
        },
        onError: (error) => {
            console.error("Error: ", error);
        },
    });

    return mutateAsync;
}