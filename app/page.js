import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page() {
  return (
    <h1>
      Welcome to Student-information app,
      <Link href={"/login"}> please login</Link>
    </h1>
  );
}

//köşeli parentez açarsan url parametresi olarak aliyor
//normal parantez açarsan işe yaramıyor sadece dosyalandırma için, route etkilemiyor
