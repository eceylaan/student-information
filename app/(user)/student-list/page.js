import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: students } = await supabase.from("students_informations").select();

  return (
    <ul>
      {students?.map((student) => (
        <li key={student.id}>{student.name}</li>
      ))}
    </ul>
  );
}

//köşeli parentez açarsan url parametresi olarak aliyor
//normal parantez açarsan işe yaramıyor sadece dosyalandırma için, route etkilemiyor
