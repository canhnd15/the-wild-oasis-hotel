import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Cabins could not be loaded.");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error("Cabins could not be deleted.");

  return data;
}

export async function createCabin(newCabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([
      {
        name: newCabin.name,
        max_capacity: newCabin.maxCapacity,
        regular_price: newCabin.regularPrice,
        discount: newCabin.discount,
        description: newCabin.description,
        image: newCabin.image,
      },
    ])
    .select();

  if (error) throw new Error("Cabins could not be inserted.");
  return data;
}
