import { createClient } from "@/utils/supabase/server";

export default async function Mynotes() {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  const response = await supabase.from("students_informations").select("*").eq("email", user.data.user.email);
  const foundedUser = response.data[0];
  const ort = calculate();
  function calculate() {
    if (!foundedUser) return 0;

    const vize1 = Number(foundedUser.vize) || 0;
    const vize2 = Number(foundedUser.vize2) || 0;
    const final = Number(foundedUser.final) || 0;

    const ortalama = (vize1 * 25) / 100 + (vize2 * 25) / 100 + (final * 50) / 100;
    console.log(ortalama);

    return ortalama;
  }
  return (
    <div>
      <h3>Notlarım</h3>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">1.Vize</th>
            <th className="px-4 py-2">2.Vize</th>
            <th className="px-4 py-2">Final</th>
            <th className="px-4 py-2">Ortalama</th>
          </tr>
        </thead>
        <tbody>
          {
            <tr>
              <td className="border px-4 py-2">{foundedUser.name}</td>
              <td className="border px-4 py-2">{foundedUser.vize}</td>
              <td className="border px-4 py-2">{foundedUser.vize2}</td>
              <td className="border px-4 py-2">{foundedUser.final}</td>
              <td className="border px-4 py-2">{ort}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  );
}
