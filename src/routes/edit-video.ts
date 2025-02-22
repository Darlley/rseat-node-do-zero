import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { DatabasePostgres } from '../../database';

const database = new DatabasePostgres();

export const editVideoRoute: FastifyPluginAsyncZod = async (app) => {
  app.put(
    '/videos/:id',
    {
      schema: {
        summary: 'Edit video',
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          title: z.string(),
          description: z.string(),
          url: z.string(),
        }),
        response: {
          204: z.object({
            message: z.string().optional(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      await database.update(id, request.body);

      return reply.status(204).send();
    }
  );
};
