import React, {useState} from 'react';
import Typography from "../../../../components/Common/Layouts/Typography";
import TextFields from "../../../../components/DesignStuff/TextFields/TextFields";
import Column from "../../../../components/Common/Layouts/Column";
import * as S from "../../../../components/DesignStuff/TextFields/style";
import styled from "styled-components";
import {theme} from "../../../../styles/theme";

interface ScheduleEditTitleProps {
    title: string;
    setTitle: (value: string) => void;
}

function ScheduleEditTitle({title, setTitle}: ScheduleEditTitleProps) {
    const [isSelect, setIsSelect] = useState(false);
    return (
        <Column gap={8} width="w-full">
            <Typography typoSize="B2_medium" color="Gray500">제목</Typography>
            <S.InputInfos isSelected={isSelect} >
                <Input
                    placeholder="일정 제목"
                    onFocus={() => setIsSelect(true)}
                    onBlur={() => setIsSelect(false)}
                    value={title}
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </S.InputInfos>
        </Column>
    );
}

export default ScheduleEditTitle;

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