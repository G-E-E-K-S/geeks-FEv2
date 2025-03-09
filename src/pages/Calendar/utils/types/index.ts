export type Calendar = "calendar" | "modal" | "home";

export type ScheduleType = "OUTING" | "SLEEPOVER" | "TOGETHER" | "ETC";

export interface Schedule {
	roommateScheduleId: number,
	title: string,
	startDate: string,
	endDate: string,
	type: ScheduleType,
	description: string,
	nickname: string,
	writerStatus: boolean,
	image: string,
}

export interface ScheduleDay {
	schedules: Schedule[];
}

