import WatchForm from "@/components/WatchForm";
import EditWatch from "@/components/EditWatch";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { deleteWatch } from "../server-actions/deleteWatch";

export default async function WatchList() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  const { data: watches, error } = await supabase
    .from("watches")
    .select("*")
    .eq("user_id", user.id)
    .order("brand", { ascending: true });
  if (error) {
    console.error("Error fetching watches");
  }

  console.log(watches);

  return (
    <div className="min-h-screen bg-slate-500 text-white">
      <div className="container mx-auto flex flex-col p-4">
        <div className="flex items-center mb-4">
          <h1 className="text-4xl font-bold mb-4">Your Watch List</h1>
          <form action="/auth/signout" method="post" className="ml-auto">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
              Sign Out
            </button>
          </form>
        </div>
        <WatchForm />
        <div>
          {watches.map((watch) => (
            <div key={watch.id} className="border-b border-gray-200 p-4">
              <h2 className="text-xl font-medium mb-1">
                {watch.brand} - {watch.model}
              </h2>
              <div className="flex justify-end">
                <form action={deleteWatch} className="mr-2 flex">
                  <input type="hidden" name="id" value={watch.id} />
                  <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-md">
                    Delete
                  </button>
                </form>
                <EditWatch watch={watch} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
