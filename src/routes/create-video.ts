import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { DatabasePostgres } from '../../database';

const database = new DatabasePostgres();

export const createVideosRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/videos',
    {
      schema: {
        summary: 'Create video',
        body: z.object({
          title: z.string(),
          description: z.string(),
          url: z.string(),
        }),
        response: {
          201: z.object({
            message: z.string().optional(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { title, description, url } = request.body;

      await database.create({
        title,
        description,
        url,
      });

      return reply.status(201).send();
    }
  );
};
