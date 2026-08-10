import "./App.css"
import { StageComponent as Stage } from "./client/components/stage/Stage"
import { Server } from "./server/Server"

const server = new Server()
const { balance } = server.load({
	userId: "user123",
	gameId: "game123",
})

function App() {
	const bet = () => {
		console.log(
			server.bet({
				userId: "user123",
				gameId: "game123",
				betAmount: 100,
			}),
		)
	}

	return (
		<>
			{/* <Header>Jackpot info here</Header> */}
			<Stage />
		</>
	)
}

export default App
