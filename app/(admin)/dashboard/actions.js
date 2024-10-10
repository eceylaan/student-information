"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateStudentVize(formData) {
  const supabase = createClient();
  const vize = formData.get("vize");
  const vize2 = formData.get("vize2");
  const final = formData.get("final");
  const studentid = formData.get("student_id");
  const { data, error } = await supabase
    .from("students_informations")
    .update({ vize: Number(vize), vize2: Number(vize2), final: Number(final) })
    .eq("id", studentid)
    .select();
  if (error) {
    console.log(error);
    return;
  }
  revalidatePath("/", "layout");
}
