import { User } from "@prisma/client"
import { handler } from "../../utils/promiseHandler"
import { prismaClient } from "../../utils/db"

interface VaultInterface {
    user_id: string,
    salt: string
}

interface UpdateVaultInterface {
    userId: string,
    data: string
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

export const updateVault = async ({userId, data}: UpdateVaultInterface) => {
    return await handler(prismaClient.vault.update({
        where: {
           user_id: userId
        },
        data: {
            data
        }
    }))
}

export const findVault = async (userId: string) => {
    return await handler(prismaClient.vault.findUnique({
        where: {
            user_id: userId
        }
    }))
}