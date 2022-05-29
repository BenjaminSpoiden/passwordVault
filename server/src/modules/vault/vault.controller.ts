import { FastifyReply, FastifyRequest } from "fastify";
import { get } from "lodash";
import { logger } from "../../utils/logger";
import { updateVault } from "./vault.service";

export const updateVaultHandler = async (req: FastifyRequest<{
    Body: {
        encryptedVault: string
    }
}>, reply: FastifyReply) => {

    const userId = get(req, 'user.uuid')

    const {data: vault, error} = await updateVault({
        data: req.body.encryptedVault,
        userId
    })

    if (vault) {
        logger.info(vault)
        reply.code(201).send("Vault Updated")
    }

    if (error) {
        logger.error(error)
        reply.code(500).send(error)
    }
}