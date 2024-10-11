import { createClient } from "@/utils/supabase/server";

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // yukardaki yazıda ic ice obje destructuring var

  return <div>Welcome {user && user.email}</div>;
}
