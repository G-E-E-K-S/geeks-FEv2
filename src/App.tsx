import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

import GlobalStyle from "./styles/GlobalStyle";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<RouterProvider router={router} />
			{/* <Router>
				<Routes>
					<Route path="/" element={<Intro />} />
					<Route path="/agree" element={<Agree />} />
					<Route path="/servicetxt" element={<ServiceTxt />} />
					<Route path="/personalinfotxt" element={<PersonalInfoTxt />} />
					<Route path="/marketingtxt" element={<MarketingTxt />} />
					<Route path="/locationtxt" element={<LocationTxt />} />
					<Route path="/accessright" element={<AccessRight />} />
					<Route path="/welcome" element={<Welcome />} />
					<Route path="/login" element={<Login />} />
					<Route path="/inputemail" element={<InputEmail />} />
					<Route path="/inputcode" element={<InputCode />} />
					<Route path="/password" element={<Password />} />
					<Route path="/nickname" element={<NickName />} />
					<Route path="/questiontext" element={<QuesText />} />
					<Route path="/major" element={<Major />} />
					<Route path="/finalpage" element={<FinalPage />} />
					<Route path="/findPassword" element={<FindPassword />} />
					<Route path="/alreadyregist" element={<AlreadyRegist />} />
					<Route path="/gender" element={<Gender />} />
					<Route path="/dormitory" element={<Dormitory />} />
					<Route path="/home" element={<Home />} />
					<Route path="/liverule" element={<LiveRule />} />
					<Route path="/search" element={<Search />} />
					<Route path="/noti" element={<Alarm />} />
					<Route path="/mypage" element={<MyPage />} />
					<Route path="/myprofile" element={<MyProfile />} />
					<Route path="/secessionreason" element={<SecessionReason />} />
					<Route path="/lifestyle" element={<LifeStyles />} />
					<Route path="/editprofile" element={<EditProfile />} />
					<Route path="/settinguserinfo" element={<SettingUserInfo />} />
					<Route path="/savelist" element={<SaveList />} />
					<Route path="/notice" element={<Notice />} />
					<Route path="/notification" element={<NotificationSetting />} />
					<Route path="/changepassword" element={<ChangePassword />} />
					<Route path="/notice/details/:noticenum" element={<NoticeDetail />} />
					<Route path="/roommate" element={<FindRoommate />} />
					<Route path="/finishroommate" element={<FinishRoommate />} />
					<Route path="/detail/details/:matchingId/:opponentId" element={<CompareUserInfo />} />
					<Route path="/roommatesendtext" element={<RoommateSendText />} />
					<Route path="/chat" element={<Chat />} />
					<Route path="/chat/chatroom/:roomId" element={<ChatRoom />} />
					<Route path="/roommate/apply" element={<RoommateApply />} />
					<Route path="/loading" element={<Loading />} />
					<Route path="/termpolicy" element={<TermPolicy />} />
					<Route path="/calendar" element={<Calendar />} />
					<Route path="/schedule/:scheduleId" element={<Schedule />} />
					<Route path="/schedule/add" element={<ScheduleEdit />} />
					<Route path="/schedule/:scheduleId/modify" element={<ScheduleEdit />} />
				</Routes>
			</Router> */}
		</ThemeProvider>
	);
}

export default App;
