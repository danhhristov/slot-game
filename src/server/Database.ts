export class Database {
	protected _users: Map<string, { balance: number; pendingWinnings: number }>

	constructor() {
		this._users = new Map()
	}

	createNewUser(userId: string, initialBalance: number): void {
		if (this._users.has(userId)) {
			throw new Error(`User with ID ${userId} already exists.`)
		}

		this._users.set(userId, { balance: initialBalance, pendingWinnings: 0 })
	}

	getUserBalance(userId: string): number {
		const user = this._users.get(userId)

		if (!user) {
			throw new Error(`User with ID ${userId} not found.`)
		}

		return user.balance
	}

	updateUserBalance(userId: string, newBalance: number): void {
		const user = this._users.get(userId)

		if (!user) {
			throw new Error(`User with ID ${userId} not found.`)
		}

		user.balance = newBalance
	}

	updatePendingWinnings(userId: string, amount: number): void {
		const user = this._users.get(userId)

		if (!user) {
			throw new Error(`User with ID ${userId} not found.`)
		}

		user.pendingWinnings = amount
	}

	collectPendingWinnings(userId: string): number {
		const user = this._users.get(userId)

		if (!user) {
			throw new Error(`User with ID ${userId} not found.`)
		}

		user.balance += user.pendingWinnings
		user.pendingWinnings = 0

		return user.balance
	}
}
