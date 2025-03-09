import { ReactNode, useEffect } from "react";

import * as S from "./style";

export default function BottomSheet({
	height,
	children,
	isOpen
}: {
	height: string;
	children: ReactNode;
	isOpen?: boolean;
}) {
	if (isOpen) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "auto";
	}

	return (
		<>
			<S.ModalBackground isOpen={isOpen} />
			<S.TotalBottomSheet height={height} isOpen={isOpen}>
				{children}
			</S.TotalBottomSheet>
		</>
	);
}
