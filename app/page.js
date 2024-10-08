import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page() {
  return <h1>MAİN PAGE</h1>;
}

//köşeli parentez açarsan url parametresi olarak aliyor
//normal parantez açarsan işe yaramıyor sadece dosyalandırma için, route etkilemiyor
