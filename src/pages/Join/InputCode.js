import React, { useState, useRef } from "react";
import API from "../../axios/BaseUrl";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import * as c from "../../components/Common/CommonStyle";
import Header from "../../components/Join/Header";
import TopNumber from "../../components/Join/TopNumber";
import JoinButton from "../../components/Join/JoinButton";
import MainText from "../../components/Join/MainText";
import ErrorPopup from "../../components/Common/ErrorPopup";

const TotalSendMail = styled.div`
  display: flex;
  margin-top: 2.25vh;
`;

const SendMailText = styled.div`
  margin-right: 8px;
  color: #949494;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`;

const ReSendBtn = styled.div`
  display: flex;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  color: ${(props)=>props.isResend ? '#D0D0D0': '#525252'};
  border-radius: 6px;
  background-color: ${(props)=>props.isResend ? '#F7F7F7': '#efefef'};
  cursor: pointer;
  pointer-events : ${(props)=>props.isResend && 'none'};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
`;

const InputNumber = styled.div`
  display: flex;
  margin-top: 6.99vh;
`;

const Code = styled.input`
  border: none;
  outline: none;
  width: 72px;
  height: 50px;
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 2px solid
    ${(props) => (props.isSelected ? "#ECAA00" : "#EFEFEF")};
  margin-right: 20px;
  font-style: normal;
  text-align: center;
  font-size: 48px;
  font-weight: 700;
  line-height: 32px; /* 66.667% */
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const InputCode = () => {
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [isSelected, setIsSelected] = useState(false);
  const [isNextPage, setIsNextPage] = useState(false);
  const [isErrorPopup, setIsErrorPopup] = useState(false);
  const [isResend, setIsResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (index, event) => {
    const nextIndex = index + 1;

    if (event.target.value.length === 1 && nextIndex < inputRefs.length) {
      inputRefs[nextIndex].current.focus();
    }

    event.target.value.length > 0 ? setIsNextPage(true) : setIsNextPage(false);
  };

  const handleKeydown = (index, event) => {
    let beforeIndex = index - 1;
    if (index == 0) {
      beforeIndex = 0;
    }
    if (event.keyCode == 8) {
      inputRefs[beforeIndex].current.focus();
    }
  };

  const checkCode = () => {
    let code= "";
    for(let i = 0 ; i < 4 ; i++){
      code += inputRefs[i].current.value;
    }

    //if(code.length !== 4) return;

    async function fetchCode() {
      try {
        const res = await API.get("/mail/auth?code=" + code);
        if(res.data === 'success!'){
          navigate('/password')
        }else{
          setIsErrorPopup(true);
        }
      } catch (error) {
        console.error(error);
        setIsErrorPopup(true);
      }
    }
    fetchCode();
  };

  const ChangeBarColor = () => {
    setIsSelected(true);
  };

  const ReSendEmail = () => {
    let UserEmail = location.state?.userEmail;
    async function fetchCode() {
      try {
        const res = await API.get("/mail/send?email=" + UserEmail + "@sangmyung.kr");
        if(res.status==200) setIsResend(true);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCode();
  }

  return (
    <c.Totalframe>
      <c.ScreenComponent>
        <Header />
        <TopNumber page={2} />
        <MainText
          maintitle={`수신된 메일에 적힌\n4자리 코드를 입력해 주세요`}
        />
        <TotalSendMail>
          <SendMailText>메일이 도착하지 않았나요?</SendMailText>
          <ReSendBtn onClick={()=>ReSendEmail()} isResend={isResend}>인증 메일 재전송</ReSendBtn>
        </TotalSendMail>
        <InputNumber>
          {inputRefs.map((ref, index) => (
            <Code
              isSelected={isSelected}
              key={index}
              ref={ref}
              type="number"
              maxLength={1}
              onChange={(e) => handleInputChange(index, e)}
              onKeyUp={(e) => handleKeydown(index, e)}
              onFocus={() => ChangeBarColor()}
            />
          ))}
        </InputNumber>
        <ErrorPopup 
        message={`코드가 일치하지 않아요`} 
        bottom={`18.72`} 
        setShowPopup={setIsErrorPopup}
        isShowPopup={isErrorPopup}
        />
        <JoinButton
          btnName={"코드 확인하기"}
          select={() => ChangeBarColor()}
          handleClick={() => checkCode()}
          isNextPage={isNextPage}
        />
      </c.ScreenComponent>
    </c.Totalframe>
  );
};

export default InputCode;
