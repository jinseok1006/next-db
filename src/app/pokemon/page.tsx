import { getPokemons, postPokemon } from "@/api/db";
import { revalidatePath } from "next/cache";

export default async function Pokemon() {
  const pokemons = await getPokemons();

  //   console.log(pokemons);

  return (
    <div>
      {pokemons.map(({ id, name, hp }) => (
        <div key={id} className="flex gap-x-1">
          <div>{id}</div>
          <div>{name}</div>
          <div>{hp}</div>
        </div>
      ))}
      <SubmitForm />
    </div>
  );
}

function SubmitForm() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const hp = parseInt(formData.get("hp")! as string);
    // console.log(formData);
    await postPokemon(name, hp);
    revalidatePath('/');
  }

  return (
    <form action={handleSubmit}>
      <input type="text" name="name" />
      <input type="number" name="hp" />
      <button type="submit">submit</button>
    </form>
  );
}
