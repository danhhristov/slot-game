import { Container, Graphics } from "@pixi/react"
import { ReelArea } from "../reels/ReelArea"
import { useRef, useEffect, useCallback } from "react"

export const Game = () => {
	const reelaAreaMaskRef = useRef(null)
	const reelAreaRef = useRef(null)

	useEffect(() => {
		if (reelAreaRef.current && reelaAreaMaskRef.current) {
			reelAreaRef.current.mask = reelaAreaMaskRef.current
		}
	}, [])

	const createReelAreaMask = useCallback((g: any) => {
		g.clear()
		g.beginFill(0xffffff)
		g.drawRect(500, 155, 785, 475)
		g.endFill()
	}, [])
	return (
		<Container ref={reelAreaRef}>
			<Graphics ref={reelaAreaMaskRef} draw={createReelAreaMask} />
			<ReelArea />
		</Container>
	)
}
