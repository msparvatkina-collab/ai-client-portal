"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createClientRecord(formData: FormData) {
  const supabase = await createClient();

  await supabase.from("clients").insert({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    status: formData.get("status") as string,
    phone: formData.get("phone") as string,
    company: formData.get("company") as string,
    notes: formData.get("notes") as string,
  });

  revalidatePath("/clients");
  redirect("/clients");
}

export async function updateClientRecord(id: number, formData: FormData) {
  const supabase = await createClient();

  await supabase
    .from("clients")
    .update({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      status: formData.get("status") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      notes: formData.get("notes") as string,
    })
    .eq("id", id);

  revalidatePath("/clients");
  revalidatePath(`/clients/${id}`);
  redirect(`/clients/${id}`);
}
