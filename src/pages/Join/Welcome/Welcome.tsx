import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import API from "../../../axios/BaseUrl";
import Typography from "../../../components/Common/Layouts/Typography";
import Modal from "../../../components/Common/Modal";

import * as CS from "../../../components/Common/CommonStyle";
import * as S from "./style";
import Popup from "../../../components/Common/Popup";
import House from "../../../assets/gif/house.gif";
import Logo from "../../../assets/img/Common/mainLogo.png";
import TextLogo from "../../../assets/img/Common/yellowLogo.svg";
import Column from "../../../components/Common/Layouts/Column";
import "@pwabuilder/pwainstall";
import Button from "../../../components/DesignStuff/Button/Button";
import { useGetToken } from "../../../store/useGetToken";
import { replace } from "lodash";

export default function Welcome() {
	const [showPopup, setShowPopup] = useState(false);
	const location = useLocation();
	const [popupMessage, setPopupMessage] = useState("");
	const [isInstalled, setIsInstalled] = useState(window.matchMedia("(display-mode: standalone)").matches);
	//@ts-ignore
	const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;

	const [updateState, setUpdateState] = useState(true);
	// const [phoneKind, setPhoneKind] = useState("");

	const [isModalOpen, setIsModalOpen] = useState(true);
	const { setToken } = useGetToken();
	const navigate = useNavigate();

	const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

	useEffect(() => {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker.ready.then((registration) => {
				registration.update();
			});
		}
	}, [location]);

	const handleBeforeInstallPrompt = (event) => {
		event.preventDefault();

		setDeferredPrompt(event);
	};

	useEffect(() => {
		window.addEventListener("beforeinstallprompt", (event) => {
			event.preventDefault();
			setDeferredPrompt(event);
		});

		return () => {
			window.removeEventListener("beforeinstallprompt", () => {});
		};
	}, []);

	const handleInstall = () => {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			deferredPrompt.userChoice.then((choiceResult: any) => {
				if (choiceResult.outcome === "accepted") {
					console.log("사용자가 앱 설치를 동의했습니다.");
				} else {
					console.log("사용자가 앱 설치를 동의하지 않았습니다.");
				}

				setDeferredPrompt(null);
			});
		}
	};

	useEffect(() => {
		const checkStandaloneMode = () => {
			setIsInstalled(window.matchMedia("(display-mode: standalone)").matches);
		};
		window.addEventListener("visibilitychange", checkStandaloneMode);
		setPopupMessage(location.state?.prev);
		setShowPopup(location.state?.prev === "logout" || location.state?.prev === "withdrawal" ? true : false);

		async function fetchAutoLogin() {
			try {
				const res = await API.get("/api/v1/user/validate");
				if (res.data.success) {
					// localStorage.setItem("token", res.data.data);
					navigate("/home", { replace: true });
				}
			} catch (error) {
				console.error(error);
			}
			// window.history.replaceState({ prev: "" }, "", "/welcome");
		}

		fetchAutoLogin();

		return () => {
			window.removeEventListener("visibilitychange", checkStandaloneMode);
		};
	}, []);

	return (
		<>
			<Popup
				message={popupMessage === "logout" ? `로그아웃 되었습니다` : `탈퇴가 정상적으로 처리되었습니다`}
				setShowPopup={setShowPopup}
				isShowPopup={showPopup}
				top={`9.5`}
			/>
			<Typography typoSize="H2" color="Gray800" textAlign="center" style={{ marginTop: "12.27vh" }}>
				{`기숙사 생활 걱정 끝,\n긱스에 오신 걸 환영해요!`}
			</Typography>
			<Typography typoSize="T3_medium" color="Gray500" textAlign="center" style={{ marginTop: "1.89vh" }}>
				{`이메일 가입으로 바로 시작해보세요`}
			</Typography>
			<S.TotalImg>
				<S.TopImg src={House} />
			</S.TotalImg>
			<Button text="이메일 회원가입" isNextPage={true} onClick={() => navigate("/agree")} />
			<S.LoginButton onClick={() => navigate("/login")}>로그인</S.LoginButton>
			{/* {deferredPrompt && <button onClick={handleInstall}>앱 설치</button>} */}
			{!isInstalled && (deferredPrompt || updateState || /iPad|iPhone|iPod/.test(navigator.userAgent)) && (
				<Modal padding={`40px 24px 28px 24px`} isWelcome={true}>
					<Column horizonAlign="center" verticalAlign="center" gap={12}>
						<S.LogoImg src={Logo} />
						<img src={TextLogo} />
					</Column>
					<Typography
						typoSize="T1"
						color="Gray800"
						textAlign="center"
						style={{ marginTop: "40px", marginBottom: "40px" }}
					>
						{`긱스를 터치 한 번으로\n바로 시작해 보세요!`}
					</Typography>
					{navigator.userAgent.toLowerCase().indexOf("android") > -1 ? (
						<S.DownLoadApp onClick={() => handleInstall()}>{`앱 내려받기`}</S.DownLoadApp>
					) : (
						//@ts-ignore
						<pwa-install
							installbuttontext={"앱 내려받기"}
							iosinstallinfotext={'공유 버튼 클릭 후 "홈 화면에 추가" 를 눌러주세요!'}
							descriptionheader={``}
						/>
					)}
				</Modal>
			)}
		</>
	);
}
