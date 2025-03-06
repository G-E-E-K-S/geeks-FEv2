import Header from "../../../components/MyPage/Header";
import NoticeData from "../../../JSON/notice.json";
import * as CS from "../../../components/Common/CommonStyle";
import { useNavigate } from "react-router-dom";
import Row from "../../../components/Common/Layouts/Row";
import Typography from "../../../components/Common/Layouts/Typography";
import Column from "../../../components/Common/Layouts/Column";
import * as S from "./style";

export default function NoticeDetail() {
	return (
		<>
			<CS.Header backgroundColor="White">
				<Header />
			</CS.Header>
			{NoticeData.notice.map((val) => (
				<>
					<Column gap={8}>
						<Typography typoSize="T2_semibold" color="Gray800">
							{val.noticeName}
						</Typography>
						<Typography typoSize="B2_medium" color="Gray400">
							{val.noticeDate}
						</Typography>
					</Column>
					<S.Line />
					<Typography typoSize="B2_medium" color="Gray800">
						{val.noticeContent}
					</Typography>
				</>
			))}
		</>
	);
}
