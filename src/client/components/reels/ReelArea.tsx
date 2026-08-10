import { Container } from "@pixi/react"
import { Reel } from "./Reel"

export const ReelArea = () => {
	const reelsMap = Array.from({ length: 5 }, (_, i) => (
		<Reel key={i} x={500 + i * 160} name={`reel-${i}`} />
	))
	return <Container>{reelsMap}</Container>
}
