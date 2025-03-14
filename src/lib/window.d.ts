declare interface Window {
	aptos?: PetraWallet
}



interface PetraWallet {
	account: () => Promise<{ address?: string }>

	connect: () => Promise<{ address?: string }>

	disconnect: () => Promise<void>
	
	network: () => Promise<'Devnet' | 'AnythingOther'>
	
	onAccountChange: (callback: (account: { address?: string }) => void) => void
	
	signAndSubmitTransaction: (tx: {
		arguments: Array<string>
		function: string
		type: 'entry_function_payload'
		type_arguments: Array<string>
	}) => Promise<{ hash: string }>
}