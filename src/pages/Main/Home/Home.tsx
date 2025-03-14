import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import API from "../../../axios/BaseUrl";
import * as S from "./style";
import * as CS from "../../../components/Common/CommonStyle";
import Header from "../../../components/Main/Header/Header";
import Popup from "../../../components/Common/Popup";
import checklist from "../../../assets/img/Home/checkList.svg";
import stayOut from "../../../assets/img/Home/stayOut.svg";
import dormiNoti from "../../../assets/img/Home/dormiNoti.svg";
import Call from "../../../assets/img/Home/callHeader.svg";
import Close from "../../../assets/img/Home/close.svg";
import ApplyRoommate from "../../../assets/gif/applyRoommateGIf.gif";
import Find from "../../../assets/gif/find.gif";
import ForwardArrow from "../../../assets/img/Home/forwardArrow.svg";
import SendAlarm from "../../../assets/img/Home/alarm.svg";
import Loading from "../../Loading";
import Row from "../../../components/Common/Layouts/Row";
import Column from "../../../components/Common/Layouts/Column";
import Typography from "../../../components/Common/Layouts/Typography";
import ButtonBox from "../../../components/DesignStuff/ButtonBox/ButtonBox";

import Tooltip from "../../../components/DesignStuff/ToolTip/ToolTip";
import { useUserInfo } from "../../../store/useUserInfo";
import UserProfile from "../../../components/Main/UserProfile/UserProfile";
import { UserProfileType } from "../../../types/userProfileType";
import CalendarHeader from "../../Calendar/ui/CalendarHeader";
import CalendarGrid from "../../Calendar/components/CalendarGrid";
import TodaySchedules from "../../Calendar/components/TodaySchedules";
import { useCalendarStore } from "../../../store/calendarStore";
import { useWeekSchedules } from "../../Calendar/hooks/useWeekSchedules";
import ErrorPopup from "../../../components/Common/ErrorPopup";

export default function Home() {
	const MAIN_HEADER = [
		{ key: "checklist", menuName: "생활 규칙", Icon: checklist },
		{ key: "stayout", menuName: "외박 신청", Icon: stayOut },
		{ key: "dormitorynoti", menuName: "기숙사 공지", Icon: dormiNoti },
		{ key: "dormitoryCall", menuName: "문의하기", Icon: Call }
	];
	const [showPopup, setShowPopup] = useState(false);
	const [isShowWriteReview, setIsShowWriteReview] = useState(localStorage.getItem("show") !== "false");
	const [isExist, setIsExist] = useState(false);
	const [isRoommateApply, setIsRoommateApply] = useState<number>(0);
	const [matchingTop3User, setMatchingTop3User] = useState<UserProfileType[]>([]);
	const [isOffAlarm, setIsOffAlarm] = useState(false);
	const [isSendMessage, setIsSendMessgae] = useState(false);
	const navigate = useNavigate();

	const { currentDate } = useCalendarStore();

	const handleHeader = (headerKey: string) => {
		switch (headerKey) {
			case "checklist":
				navigate("/liverule");
				break;
			case "stayout":
				window.open("https://smsso.smu.ac.kr/svc/tk/Auth.do?ac=Y&ifa=N&id=portal&", "_blank");
				break;
			case "dormitorynoti":
				window.open("https://www.smu.ac.kr/dormi2/board/notice.do", "_blank");
				break;
			case "dormitoryCall":
				window.location.href = "tel:041-623-0350";
				break;
		}
	};

	const { data: receiveRommateData } = useQuery({
		queryKey: ["receiveRoommate"],
		queryFn: async () => {
			const response = await API.get(`/api/v1/roommate/receive/list`);
			return response.data.data;
		},
		retry: 2
	});

	const { mutate: homeComingMutate } = useMutation({
		mutationFn: async () => {
			return await API.post(`/api/v1/roommate/homecoming`);
		},
		onSuccess: (data) => {
			if (data?.data.data === "success") setIsSendMessgae(true);
		},
		onError: (error) => {
			//@ts-ignore
			if (error.response.data.error.code === 50024) {
				setIsOffAlarm(true);
			}
			console.error(";;Error: ", error);
		}
	});

	const { data: top3UserData, isLoading } = useQuery({
		queryKey: ["getTop3User"],
		queryFn: async () => {
			const res = await API.get(`/api/v1/matching/points/top3`);
			return res.data.data;
		},
		retry: 2
	});

	const { data: mydata } = useQuery({
		queryKey: ["myData"],
		queryFn: async () => {
			const response = await API.get(`/api/v1/user/mypage`);
			return response.data.data;
		},
		retry: 2
	});

	useEffect(() => {
		const blockBack = () => {
			window.history.pushState(null, "", window.location.href);
		};

		blockBack();
		window.addEventListener("popstate", blockBack);

		return () => {
			window.removeEventListener("popstate", blockBack);
		};
	}, []);

	useMemo(() => {
		if (!top3UserData || !mydata) return;
		setIsExist(top3UserData.exists);
		setMatchingTop3User(top3UserData.opponentInfos);
		// setNickname(mydata.nickname);
		setIsRoommateApply(receiveRommateData?.length);
	}, [top3UserData, mydata, receiveRommateData]);

	const { data: weekData, isLoading: isCalendarLoading } = useWeekSchedules();
	if (isCalendarLoading) return <Loading />;
	const scheduleData = weekData?.data || [];
	const todayScheduleDatas = scheduleData[currentDate.day()]?.schedules || [];

	// 귀가 알림 onClick
	const handleHomeComing = () => {
		homeComingMutate();
	};

	const isVisited = localStorage.getItem("vap");

	return isLoading ? (
		<Loading />
	) : (
		<div style={{ paddingBottom: "100px" }}>
			<Popup
				message={`곧 만날 수 있으니 조금만 기다려 주세요!`}
				setShowPopup={setShowPopup}
				isShowPopup={showPopup}
				top={`12.5`}
			/>
			<Popup
				message={`귀가 알림을 성공적으로 보냈어요!`}
				setShowPopup={setIsSendMessgae}
				isShowPopup={isSendMessage}
				top={`15`}
			/>
			<ErrorPopup
				message={`룸메이트가 알림을 꺼놨어요`}
				setShowPopup={setIsOffAlarm}
				isShowPopup={isOffAlarm}
				top={`7`}
			/>
			<CS.Header backgroundColor="Background">
				<Header />
			</CS.Header>
			<Column gap={24}>
				<Row gap={31}>
					{MAIN_HEADER.map((header) => (
						<Column
							gap={8}
							horizonAlign="center"
							verticalAlign="center"
							style={{ width: "16.41vw" }}
							onClick={() => handleHeader(header.key)}
						>
							<img src={header.Icon} />
							<Typography typoSize="B2_medium" color="Gray900">
								{header.menuName}
							</Typography>
						</Column>
					))}
				</Row>
				{mydata?.myRoommate && (
					<ButtonBox backgroundColor="YellowGray100">
						<Row horizonAlign="distribute">
							<Column gap={4}>
								<Typography typoSize="T3_bold" color="YellowGray800">
									{"귀가 알림 보내기"}
								</Typography>
								<Typography typoSize="B2_medium" color="YellowGray600">
									{"룸메이트에게 미리 알림을 보낼 수 있어요"}
								</Typography>
							</Column>
							<Tooltip message="누르면 알림이 전송돼요" isVisible={isVisited !== "true"}>
								<img src={SendAlarm} onClick={handleHomeComing} alt="sendAlarmToRoommate" />
							</Tooltip>
						</Row>
					</ButtonBox>
				)}

				{isRoommateApply !== 0 && (
					<ButtonBox backgroundColor="Yellow100" onClick={() => navigate("/roommate/apply")}>
						<Row horizonAlign="distribute">
							<Typography typoSize="H3" color="Gray800">
								{"누군가 나에게 룸메이트를\n신청했어요!"}
							</Typography>
							<img src={ForwardArrow} style={{ width: "20px", height: "20px" }} />
						</Row>
						<Row horizonAlign="center" verticalAlign="center">
							<S.FindIcon src={ApplyRoommate} />
						</Row>
					</ButtonBox>
				)}
				{/* <ButtonBox backgroundColor="White" onClick={() => navigate("/roommate")}>
					<Row horizonAlign="distribute">
						<Typography typoSize="H3" color="Gray800" style={{ marginBottom: "32px" }}>
							{isExist
								? `${mydata?.nickname} 님과 딱 맞는\n룸메이트를 찾았어요`
								: `${mydata?.nickname} 님과 딱 맞는\n룸메이트를 찾아드려요`}
						</Typography>
						<img src={ForwardArrow} style={{ width: "20px", height: "20px" }} />
					</Row>
					{isExist ? (
						<Column gap={28}>
							{matchingTop3User.map((user) => (
								<UserProfile
									key={user.nickname}
									ID={user.studentNum}
									major={user.major}
									nickName={user.nickname}
									smoke={user.smoke}
									intro={user.introduction}
									score={user.point}
									image={user.image}
									onClick={(ev) => {
										ev.stopPropagation();
										navigate(`/detail/details/${user.matchingPointId}/${user.opponentId}`);
									}}
								/>
							))}
						</Column>
					) : (
						<Column gap={16} horizonAlign="center" verticalAlign="center">
							<S.FindIcon src={Find} />
							<Typography
								typoSize="B1_medium"
								color="Gray600"
								textAlign="center"
							>{`생활 습관을 등록하고\n나와 딱 맞는 룸메이트를 찾아보세요!`}</Typography>
							<S.EnrollRule
								horizonAlign="center"
								verticalAlign="center"
								onClick={() => navigate("/lifestyle")}
							>
								<Typography typoSize="T3_semibold" color="Black">{`생활습관 등록하기`}</Typography>
							</S.EnrollRule>
						</Column>
					)}
				</ButtonBox> */}
				{isShowWriteReview && (
					<ButtonBox
						backgroundColor={"Red50"}
						height={86}
						onClick={() => window.open("https://forms.gle/m9kF8KybtXr5E3sS7", "_blank")}
					>
						<Row horizonAlign="distribute">
							<Column gap={4}>
								<Typography typoSize="T3_bold" color="Gray800">
									{"긱스 이용 후기를 남겨주세요!"}
								</Typography>
								<Typography typoSize="B2_medium" color="Gray700">
									{"더 멋지게 보완해서 찾아올게요"}
								</Typography>
							</Column>
							<img
								src={Close}
								onClick={(e) => {
									e.stopPropagation();
									setIsShowWriteReview(false);
									localStorage.setItem("show", "false");
								}}
							/>
						</Row>
					</ButtonBox>
				)}
				<ButtonBox backgroundColor="White" onClick={() => navigate("/calendar")}>
					<CalendarHeader type="home" />
					<CalendarGrid type="home" scheduleData={scheduleData} />
					<TodaySchedules todayScheduleDatas={todayScheduleDatas} />
				</ButtonBox>
				<ButtonBox backgroundColor="White">
					<Column gap={4}>
						<Typography typoSize="T3_bold" color="Gray800">
							{"‘룸메찾기’ 기능은 2학기에 만나요!"}
						</Typography>
						<Typography typoSize="B2_medium" color="Gray800">
							{
								"2학기에는 원하는 기준을 설정해서 나와 딱 맞는\n룸메이트를 찾을 수 있어요. 조금만 기다려 주세요!"
							}
						</Typography>
					</Column>
				</ButtonBox>
			</Column>
		</div>
	);
}
