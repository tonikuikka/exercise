import { getAllHedgehogs, getHedgehog, insertHedgehog } from "@server/application/hedgehog";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

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

  fastify.get("/:id", async function (_request, reply) {
    const hedgehog = await getHedgehog((_request.params as any).id);
    return reply.code(200).send({hedgehog});
  });

  fastify.post("/", async function(_request, reply) {
    const inserted = await insertHedgehog(_request.body);
    return reply.code(200).send(inserted);
  });

  done();
}
