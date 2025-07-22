
import {
    createActor as serviceCreateActor,
    canisterId as serviceCanisterId
} from '../../src/declarations/dev_backend'

export const makeActor = (canisterId: any, createActor: any) => {
    return createActor(canisterId, {
        agentOptions: {
            "host": process.env.NEXT_PUBLIC_CANISTER_ID_DEV_BACKEND
        }
    })
}

export function serviceMakeActor() {
    return makeActor(serviceCanisterId, serviceCreateActor)
}

const actor = makeActor(process.env.NEXT_PUBLIC_CANISTER_ID_DEV_BACKEND, serviceCreateActor)

export default actor;