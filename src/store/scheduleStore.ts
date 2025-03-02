import {create} from "zustand";
import {Schedule} from "../pages/Calendar/utils/types";

interface ScheduleState {
    currentSchedule: Schedule | null;
    formattedDate: string | null;
    setCurrentSchedule: (schedule: Schedule | null) => void;
    setFormattedDate: (date: string | null) => void;
}

export const useScheduleStore = create<ScheduleState>((set) => ({
    currentSchedule: null,
    formattedDate: null,

    setCurrentSchedule: (schedule: Schedule | null) => {
        set({currentSchedule: schedule});
    },

    setFormattedDate: (date: string | null) => {
        set({formattedDate: date});
    }
}));
