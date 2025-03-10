import styled from "styled-components";
import Row from "../../Common/Layouts/Row";

const LifeStyleBox = styled.div`
    display: flex;
    border-top: 1px solid #efefef;
    padding-top: 2.36vh;
    padding-bottom: 2.36vh;
`;
const LifeStyleTxt = styled.div`
    width: 70px;
    display: flex;
    align-items: center;
`;
const TotalStyle = styled.div`
    width: 100%;
`;
const SameLifeStyle = styled.div<{$isInside:boolean}>`
    border-radius: 20px;
    background: ${({ $isInside }) => $isInside ? "#FCEDE8" : "#edf7fd"};
    padding: 0.94vh 4.1vw;
    color: #707070;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    color: #707070;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    margin: 0 auto;
    width: max-content;
    white-space: pre-wrap;
`;
const OpponentLifeStyle = styled(SameLifeStyle)<{ $isOutside: boolean }>`
    background: ${({ $isOutside }) => $isOutside ? "#DDECF8" : "linear-gradient(0deg, rgba(255, 184, 184, 0.2) 0%, rgba(255, 184, 184, 0.2) 100%), #fcede8"};
    max-width: 34.1vw;
    word-break: keep-all;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const MyLifeStyle = styled(OpponentLifeStyle)<{ $isOutside: boolean }>`
    background: ${({ $isOutside }) => $isOutside ? "#EDF7FD" : "#fcede8"};
    height: max-content;
`;

interface CompareLifeStyleProps {
	lifeStyle: string;
	isSame?: boolean;
	myLifeStyle?: string;
	opponentLifeStyle?: string;
}

export default function CompareLifeStyle({ lifeStyle, isSame, myLifeStyle, opponentLifeStyle }: CompareLifeStyleProps) {
	const isOutside: boolean = (myLifeStyle === "나가는 걸\n좋아해요") || (opponentLifeStyle === "나가는 걸\n좋아해요");
	const isInside:boolean = !!((myLifeStyle === "집에 있는 걸\n좋아해요") && isSame);

	return (
		<LifeStyleBox>
			<LifeStyleTxt>{lifeStyle}</LifeStyleTxt>
			<TotalStyle>
				{isSame ? (
					<SameLifeStyle $isInside={isInside}>{myLifeStyle}</SameLifeStyle>
				) : (
					<Row horizonAlign="distribute">
						<OpponentLifeStyle $isOutside={isOutside} $isInside={false}>{opponentLifeStyle}</OpponentLifeStyle>
						<MyLifeStyle $isOutside={isOutside} $isInside={false}>{myLifeStyle}</MyLifeStyle>
					</Row>
				)}
			</TotalStyle>
		</LifeStyleBox>
	);
}
