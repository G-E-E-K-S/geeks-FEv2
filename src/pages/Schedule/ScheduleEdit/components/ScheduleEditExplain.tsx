import React, {useState} from 'react';
import Typography from "../../../../components/Common/Layouts/Typography";
import TextFields from "../../../../components/DesignStuff/TextFields/TextFields";
import Column from "../../../../components/Common/Layouts/Column";
import styled from "styled-components";
import {theme} from "../../../../styles/theme";
import * as S from "../../../../components/DesignStuff/TextFields/style";

interface ScheduleEditExplainProps {
    explain: string;
    setExplain: (value: string) => void;
}

export default function ScheduleEditExplain({explain, setExplain}: ScheduleEditExplainProps) {
    const [isSelect, setIsSelect] = useState(false);
    return (
        <Column gap={8} width="w-full">
            <Typography typoSize="B2_medium" color="Gray500">설명 (선택)</Typography>
            <S.InputInfos isSelected={isSelect} >
                <Input
                    placeholder="일정 제목"
                    onFocus={() => setIsSelect(true)}
                    onBlur={() => setIsSelect(false)}
                    value={explain}
                    type="text"
                    onChange={(e) => setExplain(e.target.value)}
                />
            </S.InputInfos>
        </Column>
    );
}

const Input = styled.input`
    width: 100%;
    border: none;
    outline: none;
    line-height: 24px;
    font-weight: 600;
    font-size: 18px;

    &::placeholder {
        color: ${theme.Gray400};
    }
`;