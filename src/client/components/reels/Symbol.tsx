import { Container } from "@pixi/react"
import { useEffect, useState } from "react"
import { Assets } from "pixi.js"
import { SpineAnimation } from "../spine/SpineAnimation"

export const Symbol = (props: any) => {
	const [spineData, setSpineData] = useState<
		| {
				id: number
				spineData: any
		  }[]
		| null
	>(null)

	useEffect(() => {
		Assets.load([
			{ name: "1", src: "/assets/symbols/inbet.json" },
			{ name: "2", src: "/assets/symbols/elitbet.json" },
			{ name: "3", src: "/assets/symbols/winbet.json" },
			{ name: "4", src: "/assets/symbols/efbet.json" },
			{ name: "5", src: "/assets/symbols/palmsbet.json" },
			{ name: "6", src: "/assets/symbols/topwin.json" },
		]).then((resources) => {
			setSpineData(
				Object.entries(resources).map(([key, value]) => {
					return {
						id: parseInt(key),
						spineData: value.spineData,
					}
				}),
			)
		})
	}, [])

	if (!spineData) return null

	return (
		<Container>
			<SpineAnimation
				spineData={spineData[props.id % spineData.length].spineData}
				animationName="win"
				loop={false}
				x={props.x}
				y={props.y}
			/>
		</Container>
	)
}
