"use client";
import { signOut } from "@/actions/auth";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Signout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await supabase.auth.getUser();
      const userData = response?.data?.user;
      setUser(userData);
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return <div>{user ? <button onClick={() => signOut()}>Sign Out</button> : <div>No user</div>}</div>;
}
