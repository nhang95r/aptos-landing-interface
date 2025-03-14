import { Network, Provider } from "aptos"

export interface PageResource {
    name: string
    website: string
    twitter: string
    facebook: string
    instagram: string
    youtube: string
    tiktok: string
}

export const MODULE_ADDR = '0x4eb9d24d059db22f0f2a858f128f2e747f5ff7c441c2b95c87559aae1c29c4f7'
export const SETUP_PAGE_FUNCTION = `${MODULE_ADDR}::landing::setup_page`
export const PAGE_RESOURCE_TYPE = `${MODULE_ADDR}::landing::Page`
export const PROVIDER = new Provider(Network.DEVNET)

export const setupPageResource = async (params: PageResource) => {
    if(!window.aptos) return alert('Petra wallet is not found.')

    try {
        const { hash } = await window.aptos.signAndSubmitTransaction({
            function: SETUP_PAGE_FUNCTION,
            type: 'entry_function_payload',
            arguments: [
                params.name,
                params.website,
                params.twitter,
                params.facebook,
                params.instagram,
                params.youtube,
                params.tiktok
            ],
            type_arguments: [],
        })
        
        await PROVIDER.waitForTransaction(hash)
    } catch {}
}

export const getPageResource = async (address: string) => {
    try {
        const res = await PROVIDER.getAccountResource(address, PAGE_RESOURCE_TYPE)
        const pageResource = res.data as PageResource
        return pageResource 
    } catch (error) {
        console.log(error)
        return null
    }
}
