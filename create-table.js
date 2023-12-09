import sql from "./sql.js"

// sql`DROP TABLE IF EXISTS videos`.then(() => {
//   console.log("Tabela apagada!")
// })

sql`CREATE TABLE videos (
  id          TEXT PRIMARY KEY,
  title       TEXT,
  description TEXT,
  url         TEXT
)`.then(() => console.log('Created videos table!'))