import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import API from "../../../axios/BaseUrl";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as CS from "../../../components/Common/CommonStyle";
import * as S from "./style";
import FetchMore from "../../../components/Community/FetchMore";
import moment from "moment";
import "moment/locale/ko";
import SearchBar from "../../../components/DesignStuff/SearchBar/SearchBar";
import Row from "../../../components/Common/Layouts/Row";
import GoBack from "../../../components/Common/GoBack";
import Typography from "../../../components/Common/Layouts/Typography";
import UserProfile from "../../../components/Main/UserProfile/UserProfile";
import { UserProfileType } from "../../../types/userProfileType";

const MemberNotice = styled.div`
	padding: 13px 0 13px 20px;
	width: 100vw;
	background: #fafafa;
	font-size: 0.875rem;
	font-weight: 500;
	line-height: 18px;
	text-align: left;
	color: #949494;
	margin-left: calc(-50vw + 50%);
	position: relative;
	top: 1px;
`;

export default function Search() {
	const [inputKeyword, setInputKeyword] = useState("");
	const [searchUser, setSearchUser] = useState<UserProfileType[]>([]);

	let navigate = useNavigate();

	const { refetch } = useQuery({
		queryKey: ["searchRoommate", inputKeyword],
		queryFn: async () => {
			const response = await API.get(`/api/v1/user/search/${inputKeyword}`);
			return response.data.data;
		},
		enabled: false
	});

	const handleSearchRoommate = (inputVal: string) => {
		setInputKeyword(inputVal);
	};

	useEffect(() => {
		if (inputKeyword) {
			refetch().then((val) => setSearchUser(val.data));
		}
	}, [inputKeyword]);

	return (
		<>
			<CS.Header backgroundColor="White">
				<Row horizonAlign="center" verticalAlign="center" gap={12}>
					<GoBack />
					<SearchBar placeHolder="검색할 키워드를 입력하세요" inputVal={(val) => handleSearchRoommate(val)} />
				</Row>
			</CS.Header>
			{searchUser?.length === 0 ? (
				<S.SearchTotalTxt>
					<Typography typoSize="T3_semibold" color="Gray800">{`모든 키워드를 검색할 수 있어요`}</Typography>
					<Typography
						typoSize="T4_medium"
						color="Gray400"
						style={{ marginTop: "8px" }}
					>{`예) 닉네임, 기능, 메뉴 등`}</Typography>
				</S.SearchTotalTxt>
			) : (
				<>
					<Typography typoSize="B2_medium" color="Gray500">
						{"회원"}
					</Typography>
					<MemberNotice>{`같은 성별의 회원만 검색할 수 있어요`}</MemberNotice>
					{searchUser?.map((val) => (
						<UserProfile
							ID={val.studentNum}
							image={val.image}
							major={val.major}
							nickName={val.nickname}
							smoke={val.smoke}
							hasPadding
							onClick={() => navigate(`/details/detail/${val.matchingPointId}/${val.opponentId}`)}
						/>
					))}
				</>
			)}
		</>
	);
}
