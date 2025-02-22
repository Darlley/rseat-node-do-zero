import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { DatabasePostgres } from '../../database';

const database = new DatabasePostgres();

export const deleteVideoRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    '/videos/:id',
    {
      schema: {
        summary: 'Edit video',
        params: z.object({
          id: z.string(),
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

      await database.delete(id);

      return reply.status(204).send();
    }
  );
};
