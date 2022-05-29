import { handler } from "../../utils/promiseHandler";
import { prismaClient } from "../../utils/db";
import argon2 from "argon2"
import { logger } from "../../utils/logger";
import crypto from "crypto"

interface RegisterUserInterface {
    email: string,
    password: string,
    name?: string
}

export const generateSalt = () => crypto.randomBytes(64).toString('hex')


export const registerUser = async (userInput: RegisterUserInterface) => {
    const {data: hashedPassword, error} = await handler(argon2.hash(userInput.password))

    if(error) {
        logger.error("Register User Error", error)
        process.exit(1)
    }

    return await handler(prismaClient.user.create({
        data: {
            name: userInput.name,
            email: userInput.email,
            passsword: hashedPassword!
        }
    }))
}

export const getUsers = async () => {
    return await handler(prismaClient.user.findMany())
}