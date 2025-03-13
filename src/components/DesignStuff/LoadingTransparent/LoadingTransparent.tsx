import React from "react";
import Lottie from "lottie-react";
import LoadingImg from "../../../assets/lottie/loading.json";
import * as S from "./style";

function LoadingTransparent() {
	return (
		<S.LoadingWrapper>
			<S.LottieImg>
				<Lottie animationData={LoadingImg} />
			</S.LottieImg>
		</S.LoadingWrapper>
	);
}

export default LoadingTransparent;