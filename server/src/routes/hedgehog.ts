import { getAllHedgehogs, insertHedgehog } from "@server/application/hedgehog";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { logger } from "@server/logging";

export function hedgehogRouter(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: () => void
) {
  fastify.get("/", async function (_request, reply) {
    const hedgehogs = await getAllHedgehogs();

    return reply.code(200).send({
      hedgehogs,
    });
  });

  // TODO: Yksittäisen siilin hakeminen tietokannasta ID:llä
  // fastify.get(...);

  fastify.post("/", async function(_request, reply) {
    const inserted = await insertHedgehog(_request.body);
    return reply.code(200).send(inserted);
  });

  done();
}
