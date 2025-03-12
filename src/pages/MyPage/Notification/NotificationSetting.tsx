import * as CS from "../../../components/Common/CommonStyle";
import * as S from "./style";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Header from "../../../components/MyPage/Header";
import Typography from "../../../components/Common/Layouts/Typography";
import Toggle from "../../../components/DesignStuff/Toggle/Toggle";
import Column from "../../../components/Common/Layouts/Column";
import { handleAllowNotification } from "../../../FCM_ALARM";
import API from "../../../axios/BaseUrl";

const patchUserFcmToken = async (token: string) => {
	try {
		const response = await API.patch(`/api/v1/user/fcm/token/${token}`);
		return response.data.data;
	} catch (error) {
		console.error(error);
	}
};

const patchUserServiceNotification = async () => {
	try {
		const response = await API.patch(`api/v1/user/change/service/notify`);
		return response.data.data;
	} catch (error) {
		console.error(error);
	}
};

const patchUserRoommateNotification = async () => {
	try {
		const response = await API.patch(`api/v1/user/change/roommate/notify`);
		return response.data.data;
	} catch (error) {
		console.error(error);
	}
};

export default function NotificationSetting() {
	const queryClient = useQueryClient();
	const [toggleState, setToggleState] = useState({
		total: false,
		roommate: false,
		chat: false,
		service: false,
		marketing: false
	});

	const { data } = useQuery({
		queryKey: ["alarmState"],
		queryFn: async () => {
			const response = await API.get(`/api/v1/user/notify/state`);
			return response.data.data;
		}
	});

	const { data: userNotificationStatus } = useQuery({
		queryKey: ["notificationStatus"],
		queryFn: async () => {
			const response = await API.get(`/api/v1/user/check/fcm/token`);
			return response.data.data;
		}
	});

	const { mutateAsync: serviceNotificationMutate } = useMutation({
		mutationFn: patchUserServiceNotification,
		onSuccess: (data) => {
			console.log("success: ", data);
			queryClient.invalidateQueries({ queryKey: ["alarmState"] });

		},
		onError: (error) => {
			console.error("Error: ", error);
		}
	});

	const { mutateAsync: roommateNotificationMutate } = useMutation({
		mutationFn: patchUserRoommateNotification,
		onSuccess: (data) => {
			console.log("success: ", data);
			queryClient.invalidateQueries({ queryKey: ["alarmState"] });

		},
		onError: (error) => {
			console.error("Error: ", error);
		}
	});

	useEffect(() => {
		if (!data) return;
		setToggleState((prev) => ({
			total: data.roommate && data.service,
			...data
		}));
	}, [data]);


	const notificationHandler = async (type: string) => {
		if (type === "roommate") {
			await roommateNotificationMutate();
		} else if (type === "service") {
			await serviceNotificationMutate();
		} else {
			await roommateNotificationMutate();
			await serviceNotificationMutate();
		}
	};

	const handleToggle = async (type: string) => {
		if (Notification.permission === "denied") {
			alert('브라우저 알림 권한을 허용해주세요!');
			return;
		}

		// 권한 허용 및 토큰 받는 코드
		const { result, userFcmToken } = await handleAllowNotification();
		console.log(result, userFcmToken);

		if (result === "success") {
			// 유저 토큰이 저장돼있는지 확인
			if (userNotificationStatus) {
				await notificationHandler(type);
			} else {
				// 서버에 토큰 저장
				const fcmToken = await patchUserFcmToken(userFcmToken);
				console.log("fcm 토큰 저장:", fcmToken);
				if (fcmToken === "success") {
					await notificationHandler(type);
				}
			}
		}

		setToggleState((prev: any) => {
			if (type === "total") {
				const newState = !prev.total;
				return {
					total: newState,
					roommate: newState,
					chat: newState,
					service: newState,
					marketing: newState
				};
			} else {
				const newPartialState = {
					...prev,
					[type]: !prev[type]
				};

				newPartialState.total = Object.keys(newPartialState)
					.filter((key) => key !== "total")
					.every((key) => newPartialState[key]);

				return newPartialState;
			}
		});
	};
	return (
		<>
			<CS.Header backgroundColor="White">
				<Header subtitle={`알림 설정`} />
			</CS.Header>
			<S.MenuWrapper horizonAlign="distribute" verticalAlign="center">
				<Typography typoSize="T3_semibold" color="Gray800">
					{"전체 알림"}
				</Typography>
				<Toggle isToggle={toggleState.total} onClick={() => handleToggle("total")} />
			</S.MenuWrapper>
			<S.MenuWrapper horizonAlign="distribute" verticalAlign="center">
				<Column gap={4}>
					<Typography typoSize="T3_semibold" color="Gray800">
						{"룸메이트 맺기 알림"}
					</Typography>
					<Typography typoSize="B2_medium" color="Gray600">
						{"룸메이트 신청을 받거나 맺어졌을 시 알려드려요"}
					</Typography>
				</Column>
				<Toggle isToggle={toggleState.roommate} onClick={() => handleToggle("roommate")} />
			</S.MenuWrapper>
			{/* <S.MenuWrapper horizonAlign="distribute" verticalAlign="center">
				<Typography typoSize="T3_semibold" color="Gray800">
					{"새로운 대화 알림"}
				</Typography>
				<Toggle isToggle={toggleState.chat} onClick={() => handleToggle("chat")} />
			</S.MenuWrapper> */}
			<S.MenuWrapper horizonAlign="distribute" verticalAlign="center">
				<Column gap={4}>
					<Typography typoSize="T3_semibold" color="Gray800">
						{"서비스 알림"}
					</Typography>
					<Typography typoSize="B2_medium" color="Gray600">
						{"룸메이트가 귀가 알림을 보냈을 시 알려드려요"}
					</Typography>
				</Column>
				<Toggle isToggle={toggleState.service} onClick={() => handleToggle("service")} />
			</S.MenuWrapper>
			{/* <S.MenuWrapper horizonAlign="distribute" verticalAlign="center">
				<Column gap={4}>
					<Typography typoSize="T3_semibold" color="Gray800">
						{"마케팅 알림"}
					</Typography>
					<Typography typoSize="B2_medium" color="Gray600">
						{"긱스의 새로운 소식을 알려드려요"}
					</Typography>
				</Column>
				<Toggle isToggle={toggleState.marketing} onClick={() => handleToggle("marketing")} />
			</S.MenuWrapper> */}
		</>
	);
}
