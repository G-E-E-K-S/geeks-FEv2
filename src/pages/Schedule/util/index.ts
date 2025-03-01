import dayjs from "dayjs";

export function formatDateTimeForApi(dateString: string, timeString: string): string {
    return dayjs(`${dateString} ${timeString}`, "YYYY.M.D HH:mm").format("YYYY-MM-DDTHH:mm");
}