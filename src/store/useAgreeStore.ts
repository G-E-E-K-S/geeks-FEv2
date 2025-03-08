import { create } from "zustand";

interface AgreeState {
	total: boolean;
	service: boolean;
	personal: boolean;
	location: boolean;
	marketing: boolean;
	toggleAll: () => void;
	toggleItem: (key: keyof Omit<AgreeState, "toggleAll" | "toggleItem">) => void;
}

export const useAgreeStore = create<AgreeState>((set, get) => ({
	total: false,
	service: false,
	personal: false,
	location: false,
	marketing: false,

	toggleAll: () => {
		const { total } = get();
		set({
			total: !total,
			service: !total,
			personal: !total,
			location: !total,
			marketing: !total
		});
	},

	toggleItem: (key) => {
		set((state) => {
			const newState = { ...state, [key]: !state[key] };
			newState.total = newState.service && newState.personal && newState.location && newState.marketing;
			return newState;
		});
	}
}));
