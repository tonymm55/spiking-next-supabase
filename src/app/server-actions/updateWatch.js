"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateWatch(formData) {
  const id = formData.get("id");
  const model = formData.get("model");
  const brand = formData.get("brand");
  const referenceNumber = formData.get("referenceNumber");

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.error("User is not authenticated for use of this action.");
  }

  const { data, error } = await supabase
    .from("watches")
    .update(
      {
        model,
        brand,
        reference_number: referenceNumber,
      }
    )
    .match({ id, user_id: user.id });
  
  if (error) {
    return console.error("Error inserting data", error);
  }

  revalidatePath("/watch-list");

  return { message: "success" };
}