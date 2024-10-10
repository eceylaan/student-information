import { createClient } from "@/utils/supabase/client";
import Form from "./form";
import { Suspense } from "react";

export default async function Page() {
  const supabase = createClient();

  // Fetch student data on component mount

  const { data: students, error } = await supabase.from("students_informations").select("*");
  if (error) {
    console.error("Error fetching students:", error);
  }
  console.log(students);

  return (
    <div>
      <Suspense fallback={<div>Loading..</div>}>
        <Form students={students} />
      </Suspense>
    </div>
  );
}
