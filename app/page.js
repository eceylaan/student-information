import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1>Welcome to Student-information app,</h1>
      <h4>Please</h4>
      <h3>
        <Link href="/login"> login</Link>
      </h3>
      <h4>or</h4>
      <h3>
        <Link href="/sign-up">sign up</Link>
      </h3>
    </div>
  );
}

//köşeli parentez açarsan url parametresi olarak aliyor
//normal parantez açarsan işe yaramıyor sadece dosyalandırma için, route etkilemiyor
