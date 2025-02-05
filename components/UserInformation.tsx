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
    <div className="flex flex-col items-center bg-white rounded-lg border m-4 p-4 shadow-sm h-full">
      <Avatar className="w-14 h-14 rounded-full overflow-hidden border border-gray-300">
        {user?.imageUrl ? (
          <AvatarImage
            src={user.imageUrl}
            className="object-cover w-full h-full"
            alt="User Avatar"
          />
        ) : (
          <AvatarFallback className="bg-gray-200 text-gray-600 flex items-center justify-center">
            {firstName?.charAt(0)}
            {lastName?.charAt(0)}
          </AvatarFallback>
        )}
      </Avatar>

      <SignedIn>
        <div className="text-center mt-3">
          <p className="font-semibold text-gray-800">
            {firstName} {lastName}
          </p>
          <p className="text-xs text-gray-500">
            @{firstName?.toLowerCase()}.{lastName?.toLowerCase()}-{user?.id?.slice(-4)}
          </p>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="text-center space-y-2">
          <p className="font-semibold text-gray-700">You are not signed in</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white transition">
            <SignInButton>Sign In</SignInButton>
          </Button>
        </div>
      </SignedOut>

      <hr className="w-full border-gray-300 my-4" />

      {["Posts", "Comments"].map((label) => (
        <div key={label} className="flex justify-between w-full px-4 text-sm mb-1">
          <p className="font-semibold text-gray-500">{label}</p>
          <p className="text-blue-500">0</p>
        </div>
      ))}
    </div>
  );
}

export default UserInformation;
