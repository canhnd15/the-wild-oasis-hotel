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

export async function createUpdateCabin(newCabin, id) {
  const isHasImagePath = newCabin.image?.startsWith?.(SUPABASE_URL);

  const createdImageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = isHasImagePath
    ? newCabin.image
    : `${SUPABASE_URL}/storage/v1/object/public/cabins_images/${createdImageName}`;

  let query = supabase.from("cabins");

  // 1.1 - Insert action
  if (!id) {
    query = query.insert([
      {
        name: newCabin.name,
        max_capacity: newCabin.maxCapacity,
        regular_price: newCabin.regularPrice,
        discount: newCabin.discount,
        description: newCabin.description,
        image: imagePath,
      },
    ]);
  }

  // 1.2 - Update action
  if (id) {
    query = query
      .update({
        name: newCabin.name,
        max_capacity: newCabin.maxCapacity,
        regular_price: newCabin.regularPrice,
        discount: newCabin.discount,
        description: newCabin.description,
        image: imagePath,
      })
      .eq("id", id);
  }

  const { data, error } = await query.select().single();
  if (error) throw new Error(`Cabin could not be inserted. [${error.message}]`);

  //2. Upload image
  if (isHasImagePath) return data;
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
