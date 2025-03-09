import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import {
	Intro,
	AccessRight,
	PersonalInfoTxt,
	ServiceTxt,
	LocationTxt,
	MarketingTxt,
	Agree,
	Login,
	InputEmail,
	InputCode,
	Password,
	NickName,
	QuesText,
	Major,
	Gender,
	Dormitory,
	FindPassword,
	FinalPage,
	Welcome,
	AlreadyRegist
} from "../pages/Join/Index";
import { LiveRule, Home, Search, Alarm } from "../pages/Main/Index";
import { FindRoommate, CompareUserInfo, RoommateSendText, FinishRoommate } from "../pages/FindRoommate/Index";
import { Chat, ChatRoom } from "../pages/Chat/Index";
import {
	MyPage,
	LifeStyles,
	EditProfile,
	SettingUserInfo,
	SaveList,
	Notice,
	RoommateApply,
	MyProfile,
	SecessionReason,
	NoticeDetail,
	ChangePassword,
	Notification,
	TermPolicy
} from "../pages/MyPage/Index";
import Loading from "../pages/Loading";
import Calendar from "../pages/Calendar/Calendar";
import Schedule from "../pages/Schedule/Schedule";
import ScheduleEdit from "../pages/Schedule/ScheduleEdit/ScheduleEdit";
import DefaultLayout from "../layouts/DefaultLayout";
import NavigationLayout from "../layouts/NavigationLayout";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		// errorElement: <ErrorPage />,
		children: [
			// { path: "/", element: <NotFound /> },
			{ path: "/", element: <Intro /> },
			{ path: "/welcome", element: <Welcome /> },
			{
				element: <DefaultLayout />,
				children: [
					{ path: "/agree", element: <Agree /> },
					{ path: "/servicetxt", element: <ServiceTxt /> },
					{ path: "/personalinfotxt", element: <PersonalInfoTxt /> },
					{ path: "/marketingtxt", element: <MarketingTxt /> },
					{ path: "/locationtxt", element: <LocationTxt /> },
					{ path: "/accessright", element: <AccessRight /> },
					{ path: "/welcome", element: <Welcome /> },
					{ path: "/login", element: <Login /> },
					{ path: "/inputemail", element: <InputEmail /> },
					{ path: "/inputcode", element: <InputCode /> },
					{ path: "/password", element: <Password /> },
					{ path: "/nickname", element: <NickName /> },
					{ path: "/questiontext", element: <QuesText /> },
					{ path: "/major", element: <Major /> },
					{ path: "/finalpage", element: <FinalPage /> },
					{ path: "/findPassword", element: <FindPassword /> },
					{ path: "/alreadyregist", element: <AlreadyRegist /> },
					{ path: "/gender", element: <Gender /> },
					{ path: "/dormitory", element: <Dormitory /> },
					{ path: "/liverule", element: <LiveRule /> },
					{ path: "/search", element: <Search /> },
					{ path: "/noti", element: <Alarm /> },
					{ path: "/myprofile", element: <MyProfile /> },
					{ path: "/secessionreason", element: <SecessionReason /> },
					{ path: "/lifestyle", element: <LifeStyles /> },
					{ path: "/editprofile", element: <EditProfile /> },
					{ path: "/settinguserinfo", element: <SettingUserInfo /> },
					{ path: "/savelist", element: <SaveList /> },
					{ path: "/notice", element: <Notice /> },
					{ path: "/notification", element: <Notification /> },
					{ path: "/changepassword", element: <ChangePassword /> },
					{ path: "/notice/details/:noticenum", element: <NoticeDetail /> },
					{ path: "/finishroommate", element: <FinishRoommate /> },
					{ path: "/detail/details/:matchingId/:opponentId", element: <CompareUserInfo /> },
					{ path: "/roommatesendtext", element: <RoommateSendText /> },
					{ path: "/chat/chatroom/:roomId", element: <ChatRoom /> },
					{ path: "/roommate/apply", element: <RoommateApply /> },
					{ path: "/loading", element: <Loading /> },
					{ path: "/termpolicy", element: <TermPolicy /> },
					{ path: "/schedule/:scheduleId", element: <Schedule /> },
					{ path: "/schedule/add", element: <ScheduleEdit /> },
					{ path: "/schedule/:scheduleId/modify", element: <ScheduleEdit /> },
					{ path: "/details/detail/:matchingId/:opponentId", element: <CompareUserInfo /> }
				]
			},
			{
				element: <NavigationLayout />,
				children: [
					{ path: "/home", element: <Home /> },
					{ path: "/calendar", element: <Calendar /> },
					{ path: "/mypage", element: <MyPage /> },
					{ path: "/roommate", element: <FindRoommate /> }
				]
			}
		]
	}
]);
