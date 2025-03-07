import styled from "styled-components";

export const Totalframe = styled.div<{ background?: string }>`
    width: 100vw;
    height: 100vh;
    /* min-height: calc(var(--vh, 1vh) * 100);
	height: -webkit-fill-available;
	height: fill-available; */
    margin: 0 auto;
    /* margin-top: env(safe-area-inset-top); */
    /* margin-bottom: env(safe-area-inset-bottom); */

    background: ${(props) => props.background};
    overflow-x: hidden;
    padding: 0px 20px 24px 20px;
    overflow-y: auto;
    user-select: none;
    touch-action: pan-y;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }

    scrollbar-width: none;
`;

export const ScreenComponent = styled.div`
	&::-webkit-scrollbar {
		display: none;
	}
`;
