import sqlite3 from "sqlite3";
import * as sqlite from "sqlite";

type Resolve<T> = T extends Promise<infer U> ? U : null;

let db: Resolve<ReturnType<typeof sqlite.open>> | null = null;

async function connectDatabase() {
  return sqlite.open({
    filename: "./db.sqlite",
    driver: sqlite3.Database,
  });
}

export async function getPokemons() {
  if (!db) db = await connectDatabase();

  const pokemon = await db.all("select * from pokemon");
  return pokemon;
}

export async function postPokemon(name: string, hp: number) {
  if (!db) db = await connectDatabase();
  try {
    await db.exec(`insert into pokemon (name, hp) values ("${name}", ${hp})`);
  } catch (err) {
    console.log(err);
  }
}

// export async function initDb() {
//   if (!db) db = await connectDatabase();
//   await db.exec("create table pokemon (name string)");
//   await db.exec('insert into pokemon values ("pika")');
// }

getPokemons();
