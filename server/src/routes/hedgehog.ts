import { getAllHedgehogs, getHedgehog, insertHedgehog } from "@server/application/hedgehog";
import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { Hedgehog } from "@shared/hedgehog";

export function hedgehogRouter(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: () => void
) {
  fastify.get("/", async function (_request: FastifyRequest, reply) {
    const hedgehogs = await getAllHedgehogs();

    return reply.code(200).send({
      hedgehogs,
    });
  });

  fastify.get("/:id", async function (_request: FastifyRequest<{Params: {id: number};}>,
  reply: FastifyReply) {
    const hedgehog = await getHedgehog(_request.params.id);
    return reply.code(200).send({hedgehog});
  });

  fastify.post("/", async function(_request: FastifyRequest<{Body: Hedgehog;}>,
  reply: FastifyReply) {
    const inserted = await insertHedgehog(_request.body);
    return reply.code(200).send(inserted);
  });

  done();
}
