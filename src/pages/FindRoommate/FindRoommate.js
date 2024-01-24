import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as c from "../../components/Common/CommonStyle";
import Header from "../../components/Main/Header";
import Condition from "../../components/Roommate/Condition";
import OtherProfile from "../../components/Main/OtherProfile";
import NavigationBar from "../../components/Main/NavigationBar";
import BottomSheet from "../../components/Roommate/BottomSheet";
import basicProfile from "../../assets/img/MyPage/basicProfile.svg";
import reset from '../../assets/img/MyPage/reset.svg';
import axios from "axios";

const TitleText = styled.div`
  margin-top: 3.31vh;
  margin-bottom: 3.79vh;
  color: #333;
  white-space: pre-wrap;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
`;
const ConditionScroll = styled.div`
  display: flex;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const BottomMenues = styled.div`
  display: flex;
  padding: 2.38vh; 5.12vw 0px 5.12vw;
  border-top: 1px solid #EFEFEF;
`;
const ResetImg = styled.img`
  width: 5.12vw;
  height: 20px;
  margin-right: 4px;
`;
const FindRoommate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userdata, setUserData] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    async function fetchUserData() {
      try{
        axios.defaults.withCredentials = true;
        const res = await axios.get("http://localhost:8080/point/find");
        setUserData(res.data);
      }catch(e) {
        console.log(e);
      }
    }
    fetchUserData();
  },[]);

  return (
    <c.Totalframe background={`linear-gradient(180deg, #FFF 0%, #F7F7F7 71%)`}>
      <c.ScreenComponent>
        <c.SubScreen>
          <Header />
          <TitleText>{`내가 원하는 기준으로\n룸메이트를 찾아보세요`}</TitleText>
          <ConditionScroll onClick={()=>setIsOpen(true)}>
            <Condition condition={`전공`} />
            <Condition condition={`학번`} />
            <Condition condition={`흡연`} />
            <Condition condition={`잠버릇`} />
            <Condition condition={`외출`} />
            <Condition condition={`장소`} />
            <Condition condition={`성향`} />
          </ConditionScroll>
          {userdata.map((user)=>(
            <OtherProfile
              userprofile={basicProfile}
              nickName={user.nickname}
              major={user.major}
              id={user.studentID}
              score={user.point}
              onClick={()=>navigate('/detail/details/'+user.userId)}/>
          ))}
        </c.SubScreen>
      </c.ScreenComponent>
      {isOpen ? <BottomSheet close={()=>setIsOpen(false)}/> : <NavigationBar type={`rommate`} />}
    </c.Totalframe>
  );
};
export default FindRoommate;
