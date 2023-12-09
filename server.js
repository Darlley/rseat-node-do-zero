import { fastify } from "fastify"
import {DatabasePostgres} from "./database.js"

const server = fastify()
const database = new DatabasePostgres()

server.get("/videos", async (request,reply) => {
  const search = request.query.search

  if(!search){
    return await database.list();
  }
  
  return await database.find(search)
})

server.post("/videos", async (request, reply) => {
  const {title, description, url} = request.body
  
  await database.create({
    title, 
    description, 
    url,
  })

  return reply.status(201).send()
})

server.put("/videos/:id", async (request, reply) => {
  const video_id = request.params.id;
   
  await database.update(video_id, request.body)

  return reply.status(204).send()
})

server.delete("/videos/:id", async (request,reply) => {
  const video_id = request.params.id;
  
  await database.delete(video_id)

  return reply.status(204).send()
})

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333
})