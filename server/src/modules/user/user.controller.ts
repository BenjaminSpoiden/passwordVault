import { FastifyReply, FastifyRequest } from "fastify";
import { createVault, findVault } from "../../modules/vault/vault.service";
import { logger } from "../../utils/logger";
import { handler } from "../../utils/promiseHandler";
import { findUser, generateSalt, getUsers, registerUser } from "./user.service";

export const registerUserHandler = async (req: FastifyRequest<{
    Body: Parameters<typeof registerUser>[number]
}>, reply: FastifyReply) => {

    const body = req.body

    const {data: user, error} = await registerUser(body)
    if(error) {
        logger.error(error)
        return reply.code(500).send(error)
    }

    if(user) {
        const salt = generateSalt()
        const { data: vault, error } = await createVault({  user_id: user.uuid, salt})

        const { data: accessToken } = await handler(reply.jwtSign({
            _id: user.uuid,
            email: user.email
        }))

        if(accessToken) {
            reply.setCookie('token', accessToken, {
                domain: 'localhost',
                path: '/',
                secure: false,
                httpOnly: true,
                sameSite: false
            })

            return reply.code(201).send({ accessToken, vault, salt })
        }
    }

    return reply.code(500).send('Something went wrong')
}

export const getUsersHandler = async (req: FastifyRequest, reply:FastifyReply) => {
    const {data: users, error} = await handler(getUsers())

    if (error) {
        return reply.code(500).send(error)
    }

    return reply.code(201).send(users)
}

export const loginHander = async (req: FastifyRequest<{
    Body: Parameters<typeof findUser>[number]
}>, reply: FastifyReply) => {

    const {data: user, error: userError} = await handler(findUser(req.body))

    if(!user) {
        return reply.code(401).send({
            message: 'Invalid Email or Password'
        })
    }

    const { data: vault, error: vaultError } = await findVault(user.uuid)

    if(userError || vaultError) {
        return reply.code(500).send(userError | vaultError)
    }
    

    const { data: accessToken } = await handler(reply.jwtSign({
        _id: user.uuid,
        email: user.email
    }))

    if(accessToken) {
        reply.setCookie('token', accessToken, {
            domain: 'localhost',
            path: '/',
            secure: false,
            httpOnly: true,
            sameSite: false
        })

        return reply.code(200).send({ accessToken, vault, salt: vault?.salt })
    }
}