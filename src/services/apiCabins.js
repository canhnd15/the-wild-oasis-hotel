import supabase from "./supabase";
import { SUPABASE_URL } from "../services/supabase";

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
  // 1. Create new cabin
  const createdImageName = `${Math.random()}-${newCabin.image.name}`;
  const imagePath = `${SUPABASE_URL}/storage/v1/object/public/cabins_images/${createdImageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([
      {
        name: newCabin.name,
        max_capacity: newCabin.maxCapacity,
        regular_price: newCabin.regularPrice,
        discount: newCabin.discount,
        description: newCabin.description,
        image: imagePath,
      },
    ])
    .select();

  if (error) throw new Error("Cabins could not be inserted.");

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabins_images") //
    .upload(createdImageName, newCabin.image);

  // 3. Delete cabin if upload was error.
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Could upload cabin image to storage.");
  }

  return data;
}
