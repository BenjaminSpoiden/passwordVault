import { User } from "@prisma/client"
import { handler } from "../../utils/promiseHandler"
import { prismaClient } from "../../utils/db"

interface VaultInterface {
    user_id: string,
    salt: string
}

export const createVault = async (vaultData: VaultInterface) => {
    return await handler(prismaClient.vault.create({
        data: {
            user: {
               connect: {
                   uuid: vaultData.user_id
               }
            },
            salt: vaultData.salt
        }
    }))
}