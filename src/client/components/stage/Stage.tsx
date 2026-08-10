import { Stage } from "@pixi/react"
import { useCallback, useEffect, useState } from "react"
import { calculateCanvasSize } from "../../helpers/common"
import { initDevtools } from "@pixi/devtools"
import { Game } from "../game/Game"

export function StageComponent() {
	const [canvasSize, setCanvasSize] = useState(calculateCanvasSize)

	const updateCanvasSize = useCallback(() => {
		setCanvasSize(calculateCanvasSize())
	}, [])

	useEffect(() => {
		window.addEventListener("resize", updateCanvasSize)
		return () => {
			window.removeEventListener("resize", updateCanvasSize)
		}
	})

	return (
		<Stage
			onMount={(app: any) => {
				initDevtools({ app })
			}}
			width={canvasSize.width}
			height={canvasSize.height}
			options={{ backgroundColor: 0x000000 }}
		>
			<Game></Game>
		</Stage>
	)
}
