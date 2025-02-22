import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { DatabasePostgres } from '../../database';

const database = new DatabasePostgres();

interface Video {
  title: string;
  description: string;
  url: string;
}

export const getVideosRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/videos',
    {
      schema: {
        summary: 'Get video',
        querystring: z.object({
          search: z.string().optional(),
        }),
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              title: z.string(),
              description: z.string(),
              url: z.string(),
            })
          ),
        },
      },
    },
    async (request) => {
      const { search } = request.query;

      if (!search) {
        return await database.list();
      }
      
      return await database.find(search);
    }
  );
};
