import { Database } from "./Database"

export class Server {
	protected _db: Database

	constructor() {
		this._db = new Database()
	}

	load(request: TLoadRequest): TLoadResponse {
		let userBalance = 0
		try {
			userBalance = this._db.getUserBalance(request.userId)
		} catch (error) {
			userBalance = 100000
			this._db.createNewUser(request.userId, userBalance)
		} finally {
			return {
				status: "success",
				balance: userBalance,
			}
		}
	}

	bet(request: TBetRequest): TBetResponse {
		const userBalance = this._db.collectPendingWinnings(request.userId)

		if (request.betAmount > userBalance) {
			return {
				status: "error",
				balance: userBalance,
				message: "Not enough balance to place the bet.",
				baseBet: request.betAmount,
				totalBet: request.betAmount,
				roundWin: 0,
				totalWin: 0,
				paylines: [],
				reelData: request.reelData || [],
			}
		}

		this._db.updateUserBalance(
			request.userId,
			userBalance - request.betAmount,
		)

		const reelData = request.reelData || this.generateSpinResult()

		const { win, paylines } = this.calculateWinnings(
			reelData,
			request.betAmount,
		)

		this._db.updatePendingWinnings(request.userId, win)

		return {
			status: "success",
			balance: userBalance - request.betAmount,
			baseBet: request.betAmount,
			totalBet: request.betAmount,
			roundWin: win,
			totalWin: win,
			paylines: paylines,
			reelData: reelData,
		}
	}

	collect(request: TCollectRequest): TCollectResponse {
		const newBalance = this._db.collectPendingWinnings(request.userId)

		return {
			status: "success",
			balance: newBalance,
		}
	}

	private calculateWinnings(
		reelData: number[][],
		betAmount: number,
	): { win: number; paylines: number[][] } {
		const paylines: number[][] = []
		let win = 0

		const reel = reelData[0]

		// ignore guarding symbols
		for (let i = 1; i < reel.length - 1; i++) {
			const symbol = reel[i]

			let matchingSymbols = 1

			for (let j = 1; j < reelData.length; j++) {
				if (reelData[j][i] === symbol) {
					matchingSymbols++
				} else {
					j = reelData.length
				}
			}

			if (matchingSymbols >= 3) {
				win += betAmount * (symbol + 1) * matchingSymbols

				for (let j = 0; j < matchingSymbols; j++) {
					paylines.push([j, i])
				}
			}
		}

		return { win, paylines }
	}

	private generateSpinResult(): number[][] {
		const reels = 5
		const rows = 5
		const symbols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] // Example symbols
		const result: number[][] = []

		for (let i = 0; i < reels; i++) {
			const row: number[] = []
			for (let j = 0; j < rows; j++) {
				row.push(symbols[Math.floor(Math.random() * symbols.length)])
			}
			result.push(row)
		}

		return result
	}
}

export type TBaseRequest = {
	userId: string
	gameId: string
}

export type TLoadRequest = TBaseRequest & {}

export type TCollectRequest = TBaseRequest & {}

export type TBetRequest = TBaseRequest & {
	betAmount: number
	reelData?: number[][]
}

export type TBaseResponse = {
	status: "success" | "error"
	balance: number
	message?: string
}

export type TLoadResponse = TBaseResponse & {}

export type TCollectResponse = TBaseResponse & {}

export type TBetResponse = TBaseResponse & {
	baseBet: number
	totalBet: number
	roundWin: number
	totalWin: number
	paylines: number[][]
	reelData: number[][]
}
