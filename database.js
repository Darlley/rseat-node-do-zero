import crypto from 'node:crypto';
import sql from './sql.js';

export class DatabasePostgres {
  async list() {
    const videos = await sql`SELECT * FROM videos`;
    return videos.map((video) => ({
      id: video.id,
      title: video.title,
      description: video.description,
      url: video.url,
    }));
  }

  async find(search = '') {
    if (search != '') {
      const videos = await sql`SELECT * FROM videos WHERE title LIKE ${
        '%' + search + '%'
      }`;
      return videos.map((video) => ({
        id: video.id,
        title: video.title,
        description: video.description,
        url: video.url,
      }));
    }

    return this.list();
  }

  async create(video) {
    const video_id = crypto.randomUUID();
    const { title, description, url } = video;
    await sql`insert into videos (id, title, description, url) VALUES (${video_id}, ${title}, ${description}, ${url})`;
  }

  async update(video_id, video) {
    const { title, description, url } = video;
    await sql`update videos set title = ${title}, description = ${description}, url = ${url} where id = ${video_id}`;
  }

  async delete(video_id) {
    await sql`delete from videos where id = ${video_id}`;
  }
}
