import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { fastify } from 'fastify';
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

import { createVideosRoute } from './routes/create-video';
import { deleteVideoRoute } from './routes/delete-video';
import { editVideoRoute } from './routes/edit-video';
import { getVideosRoute } from './routes/get-videos';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);

app.setValidatorCompiler(validatorCompiler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
});
app.register(fastifySwaggerUi, {
  routePrefix: '/',
});

app.register(getVideosRoute);
app.register(createVideosRoute);
app.register(editVideoRoute);
app.register(deleteVideoRoute);

app.listen({ host: '0.0.0.0', port: 3333 }).then(() => {
  console.log('app listen in http://localhost:3333');
});
