"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
const defaultUserMetadata = {
  role: "user",
  firstName: "",
  lastName: "",
  profilePhoto: "",
  bio: "",
  birthDate: "",
};
export async function login(formData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  console.log(data);

  const { error, data: userData } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error);
    redirect("/error");
  }
  if (userData.user.user_metadata.role === "admin") {
    redirect("/adminpage");
  } else if (userData.user.user_metadata.role === "user") {
    redirect("/account");
  }
  revalidatePath("/", "layout");
}
export async function signUp(prevState, formData) {
  const supabase = createClient();
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const phone = formData.get("phone");
  if (!email) {
    console.error("There is not email");
  }
  let errors = {};

  if (!firstName) {
    errors.firstName = "This field is required";
  }

  if (!lastName) {
    errors.lastName = "This field is required";
  }

  if (!email.includes("@")) {
    errors.email = "Enter a valid email address, please";
  }
  if (password.length < 6) {
    errors.password = "Password must contain at least 6 characters";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }
  if (email === "ceylann.ece@gmail.com") {
    defaultUserMetadata.role = "admin";
  }
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    phone,
    options: {
      data: {
        ...defaultUserMetadata,
        firstName: firstName,
        lastName: lastName,
      },
    },
  });

  if (error) {
    console.log(error);
    redirect("/error");
  }
  const response = await supabase.from("students_informations").insert({
    final: 0,
    vize: 0,
    vize2: 0,
    email: data.user.email,
    name: data.user.user_metadata.firstName,
    last_name: data.user.user_metadata.lastName,
  });
  revalidatePath("/", "layout");
  redirect("/");
}
export async function signOut() {
  const supabase = createClient();
  const response = await supabase.auth.signOut();

  if (response.error) {
    console.log(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
// export async function deleteUser(id) {
//   const supabase = createClient();
//   await supabase.from("students_informations").select("id", id).delete();
//   await supabase.auth.admin.listUsers()
// }
