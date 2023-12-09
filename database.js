import crypto from "node:crypto"
import sql from "./sql.js"

export class DatabasePostgres {
  async list(){
    const videos = await sql`SELECT * FROM videos`
    return videos;
  }

  async find(search = ""){
    if(search != ""){
      return await sql`SELECT * FROM videos WHERE title like ${'%' + search + '%'}`
    }

    return sql`SELECT * FROM videos`
  }

  async create(video){
    const video_id = crypto.randomUUID();
    const {title, description, url} = video
    await sql`insert into videos (id, title, description, url) VALUES (${video_id}, ${title}, ${description}, ${url})`
  }

  async update(video_id, video){
    const {title, description, url} = video
    await sql`update videos set title = ${title}, description = ${description}, url = ${url} where id = ${video_id}`
  }

  async delete(video_id){
    await sql`delete from videos where id = ${video_id}`
  }
}