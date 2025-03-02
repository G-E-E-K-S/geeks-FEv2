import { create } from "zustand";
import dayjs, { Dayjs } from "dayjs";

interface CalendarState {
	currentDate: Dayjs;
	selectedDate: string | null;
	handlePrevMonth: () => void;
	handleNextMonth: () => void;
	handleDayClick: (day: string | number) => void;
	handleTodayClick: () => void;
	setCurrentDate: (date: Dayjs) => void;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
	currentDate: dayjs(),
	selectedDate: null,

	handlePrevMonth: () => {
		set((state) => ({
			currentDate: state.currentDate.subtract(1, "month")
		}));
	},

	handleNextMonth: () => {
		set((state) => ({
			currentDate: state.currentDate.add(1, "month")
		}));
	},

	handleDayClick: (day: string | number) => {
		if (day !== "") {
			const clickedDate = get().currentDate.date(Number(day)).format("YYYY.M.D");
			set({ selectedDate: clickedDate });
		}
	},

	handleTodayClick: () => {
		const today = dayjs();
		set({
			selectedDate: today.format("YYYY.M.D"),
			currentDate: today
		});
	},

	setCurrentDate: (date: Dayjs) => {
		set({ currentDate: date });
	},

}));
