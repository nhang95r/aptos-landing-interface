import { writable } from "svelte/store"
import { SETUP_PAGE_FUNCTION, type PageResource, PROVIDER, setupPageResource } from "./utils"



const createAddressStore = () => {
    const { set, subscribe } = writable<string | null>(null)
    
    return {
        subscribe,
        setupPage: async (params: PageResource) => {
            if(!window.aptos) return alert('Petra wallet is not found.')

            const network = await window.aptos.network()

            if(network !== 'Devnet') return alert('Set your wallet to use Devnet.')

            try {            
                await window.aptos.account()
            } catch {
                return alert('Connect your wallet.')
            }

            await setupPageResource(params)
        },
        connect: async () => {
            if(!window.aptos) return alert('Petra wallet is not found.')
            
            const { address } = await window.aptos.connect();

            set(address || null)
        },
        disconnect: async () => {
            if(!window.aptos) return alert('Petra wallet is not found.')
            
            await window.aptos.disconnect();

            set(null)
        },
        listenAccountChange: async () => {
            if(!window.aptos) return
            window.aptos.onAccountChange(({ address }) => set(address || null))
        },
        autoConnectIfAllowed: async () => {
            try {
                if(!window.aptos) return
                const { address } = await window.aptos.account()
                set(address || null)
            } catch { }
        }
    }
}

export const addressStore = createAddressStore()