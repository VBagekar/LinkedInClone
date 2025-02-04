import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import React from "react";

async function UserInformation() {
  const user = await currentUser();
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  return (
    <div className="flex  flex-col justify-center items-center bg-white mr-6 rounded-lg border py-4">
      <Avatar className="w-12 h-12">
        {user?.id ? (
          <AvatarImage
            src={user?.imageUrl}
            className="object-cover w-full h-full rounded-full"
          />
        ) : (
          <AvatarImage
            src={"https://github.com/shadcn.png"}
            className="object-cover w-full h-full rounded-full"
          />
        )}

        <AvatarFallback>
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <SignedIn>
        <div className="text-center">
          <p className="font-semibold">
            {firstName}
            {lastName}
          </p>

          <p className="text-xs">
            @{firstName}
            {lastName}-{user?.id?.slice(-4)}
          </p>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="text-center space-y-2">
          <p className="font-semibold">You are not signed in</p>
          <Button asChild className="bg-[#0B63C4] text-white">
            <SignInButton>Sign in</SignInButton>
          </Button>
        </div>
      </SignedOut>
      <hr className="w-full border-gray-200 my-5" />
      
      <div className="flex justify-between w-full px-4 text-sm">
        <p className="font-semibold text-gray-400">Posts</p>
        <p className="text-blue-400">0</p>
      </div>

      <div className="flex justify-between w-full px-4 text-sm">
        <p className="font-semibold text-gray-400">Comments</p>
        <p className="text-blue-400">0</p>
      </div>
    </div>
  );
}
export default UserInformation;
