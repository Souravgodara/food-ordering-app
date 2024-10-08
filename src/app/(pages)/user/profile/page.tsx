import { getServerSession } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function page() {
  interface Session {
    user: {
      name: string | undefined;
      email: string | undefined;
      image: string;
    };
  }
  const session: Session | null = await getServerSession(authOptions);
  async function updateProfile(formData: FormData) {
    "use server";
    const username = formData.get("username");
    fetch("http://localhost:8080/api/profile", {
      method: "PUT",
      cache: "no-store",
      body: JSON.stringify({ session, username }),
      credentials: "include",
    });
  }
  return (
    <>
      <div className='flex flex-col items-center mt-10 gap-10'>
        <div className='flex gap-2'>
          <Avatar>
            <AvatarImage src={session?.user?.image} />
            <AvatarFallback>
              {session?.user?.name.match(/[A-Z]/g)?.join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className='text-left mt-4 font-sans font-semibold text-2xl'>
              {session?.user?.name}
            </h2>
            <h2 className='text-center mt-1 text-sm font-sans'>
              {session?.user?.email}
            </h2>
          </div>
        </div>

        <div className='border rounded-lg p-6 w-[40%]'>
          <form action={updateProfile} className='flex flex-col'>
            <label className=' font-semibold text-xs'>Username</label>
            <input
              className='font-sans font-normal disabled:opacity-80 text-lg border py-2 px-2 my-2'
              name='username'
              defaultValue={session?.user?.name}
              type='text'
            />
            <label className='mt-2 font-semibold text-xs'>Email</label>
            <input
              className='font-sans font-normal disabled:opacity-80 text-lg border py-2 px-2 my-2'
              disabled
              value={session?.user?.email}
              readOnly
              type='text'
            />
            <button
              type='submit'
              className='bg-primary rounded mt-4 px-3 py-1 text-white'>
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
