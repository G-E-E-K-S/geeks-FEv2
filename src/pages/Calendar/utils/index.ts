import dayjs, {Dayjs} from "dayjs";

export const getDaysInMonth = (currentDate: Dayjs): (string | number)[][] => {
    const year: number = currentDate.year();
    const month: number = currentDate.month();
    const firstDay: Dayjs = dayjs(new Date(year, month, 1)); // 월의 첫 번째 날
    const firstDayOfWeek: number = firstDay.day(); // 첫 번째 날의 요일
    const daysInMonth: number = currentDate.daysInMonth(); // 월에 포함된 총 날짜 수

    const calendar: (string | number)[][] = [];
    let day: number = 1;

    for (let i = 0; i < 6; i++) {
        const week: (string | number)[] = [];
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDayOfWeek) {
                week.push("");
            } else if (day > daysInMonth) {
                week.push("");
            } else {
                week.push(day);
                day++;
            }
        }
        if (!week.every((value: string | number) => value === "")) {
            calendar.push(week);
        }
    }
    return calendar;
};

export const getDaysInWeek = (currentDate: Dayjs): (string | number)[] => {
    // 현재 날짜의 요일 (0: 일요일, 6: 토요일)
    const currentDayOfWeek: number = currentDate.day();

    // 현재 주의 일요일 날짜 계산
    const sunday: Dayjs = currentDate.subtract(currentDayOfWeek, 'day');

    const week: (string | number)[] = [];

    // 일요일부터 토요일까지 날짜 추가
    for (let i = 0; i < 7; i++) {
        const day: Dayjs = sunday.add(i, 'day');
        week.push(day.date());
    }
    return week;
};

export const isToday = (currentDate: Dayjs, day: string | number): boolean => {
    if (day === "") return false;
    const date = currentDate.date(Number(day));
    return dayjs().format("YYYY-MM-DD") === date.format("YYYY-MM-DD");
};

export const floorToNearest30 = (date) => {
    const minutes = Math.floor(date.minute() / 30) * 30;
    return date.minute(minutes).second(0);
};

export const formatTimeRange = (startDate: string, endDate: string) => {
    const start = dayjs(startDate).format("HH:mm");
    const end = dayjs(endDate).format("HH:mm");
    return `${start} - ${end}`;
}

export const isPreviousMonth = (currentDate, day: string | number) => {
    const selectedDay = currentDate.date(Number(day));
    return selectedDay.isBefore(currentDate, 'month');
};