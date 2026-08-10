import { Container } from "@pixi/react"
import { Symbol } from "./Symbol"

export const Reel = (props: any) => {
	const symbolsMap = Array.from({ length: 5 }, (_, i) => (
		<Symbol
			name={`symbol-${i}`}
			key={i}
			id={i}
			color={0x0000ff}
			x={props.x + 145 / 2}
			y={i * 160 + 145 / 2}
			width={100}
			height={100}
			visible={i > 0 && i < 4}
		></Symbol>
	))
	return <Container>{symbolsMap}</Container>
}
