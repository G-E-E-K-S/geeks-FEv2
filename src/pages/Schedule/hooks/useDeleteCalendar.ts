import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../../../axios/BaseUrl";

async function deleteCalendar(roommateScheduleId: string) {
	try {
		const response = await API.delete(`/api/v1/roommate/calendar/schedule/delete/${roommateScheduleId}`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

export function useDeleteCalendar() {
	const queryClient = useQueryClient();

	const { mutateAsync } = useMutation({
		mutationFn: deleteCalendar,
		onSuccess: (data) => {
			console.log("Success: ", data);
			queryClient.invalidateQueries({ queryKey: ["calendarSchedules"] });
			queryClient.invalidateQueries({ queryKey: ["weekSchedules"] });
		},
		onError: (error) => {
			console.error("Error: ", error);
		}
	});

	return mutateAsync;
}