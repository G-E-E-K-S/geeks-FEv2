import * as CS from "../../../components/Common/CommonStyle";
import * as S from "./style";
import Header from "../../../components/MyPage/Header";
import Typography from "../../../components/Common/Layouts/Typography";
import Toggle from "../../../components/DesignStuff/Toggle/Toggle";
import Column from "../../../components/Common/Layouts/Column";
import {useState} from "react";
import {handleAllowNotification} from "../../../FCM_ALARM";
import API from "../../../axios/BaseUrl";

const patchUserFcmToken = async (token: string) => {
    try {
        const response = await API.patch(`/api/v1/user/fcm/token/${token}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const patchUserServiceNotification = async () => {
    try {
        const response = await API.patch(`api/v1/user/change/roommate/notify`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default function Notification() {
    const [toggleState, setToggleState] = useState({
        total: false,
        roommate: false,
        chat: false,
        service: false,
        marketing: false
    });

    const handleToggle = async (type: string) => {
        // Recheck
        const {result, userFcmToken} = await handleAllowNotification();
        console.log(result, userFcmToken);

        if (result === "success") {
            // 토큰 저장
            // const Response = await patchUserFcmToken(userFcmToken);
            // console.log(Response);

            // 알림 토클
            // const Response = await patchUserServiceNotification();
            // console.log(Response);

        }

        // console.log(";;clickToggle");
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
        <CS.Totalframe>
            <CS.ScreenComponent>
                <CS.Header backgroundColor="White">
                    <Header subtitle={`알림 설정`}/>
                </CS.Header>
                <S.MenuWrapper horizonAlign="distribute" verticalAlign="center">
                    <Typography typoSize="T3_semibold" color="Gray800">
                        {"전체 알림"}
                    </Typography>
                    <Toggle isToggle={toggleState.total} onClick={() => handleToggle("total")}/>
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
                    <Toggle isToggle={toggleState.roommate} onClick={() => handleToggle("roommate")}/>
                </S.MenuWrapper>
                <S.MenuWrapper horizonAlign="distribute" verticalAlign="center">
                    <Typography typoSize="T3_semibold" color="Gray800">
                        {"새로운 대화 알림"}
                    </Typography>
                    <Toggle isToggle={toggleState.chat} onClick={() => handleToggle("chat")}/>
                </S.MenuWrapper>
                <S.MenuWrapper horizonAlign="distribute" verticalAlign="center">
                    <Column gap={4}>
                        <Typography typoSize="T3_semibold" color="Gray800">
                            {"서비스 알림"}
                        </Typography>
                        <Typography typoSize="B2_medium" color="Gray600">
                            {"외박 신청, 어쩌구를 알려드려요"}
                        </Typography>
                    </Column>
                    <Toggle isToggle={toggleState.service} onClick={() => handleToggle("service")}/>
                </S.MenuWrapper>
                <S.MenuWrapper horizonAlign="distribute" verticalAlign="center">
                    <Column gap={4}>
                        <Typography typoSize="T3_semibold" color="Gray800">
                            {"마케팅 알림"}
                        </Typography>
                        <Typography typoSize="B2_medium" color="Gray600">
                            {"긱스의 새로운 소식을 알려드려요"}
                        </Typography>
                    </Column>
                    <Toggle isToggle={toggleState.marketing} onClick={() => handleToggle("marketing")}/>
                </S.MenuWrapper>
            </CS.ScreenComponent>
        </CS.Totalframe>
    );
}
