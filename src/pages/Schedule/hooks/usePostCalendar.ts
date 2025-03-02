import {useMutation, useQueryClient} from "@tanstack/react-query";
import API from "../../../axios/BaseUrl";

async function postCalendar({title, startDateTime, endDateTime, type, explain}) {
    try {
        const response = await API.post(`/api/v1/roommate/calendar/create`, {
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

export function usePostCalendar() {
    const queryClient = useQueryClient();

    const {mutateAsync} = useMutation({
        mutationFn: postCalendar,
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