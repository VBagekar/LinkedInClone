import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  SearchIcon,
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  MessageSquareIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

function Header() {
  return (
    <div className="flex items-center p-2 max-w-6xl mx-auto justify-between">
      {/* Logo */}
      <Image
        className="rounded-lg"
        src="https://i.postimg.cc/wjbG8qzb/linked-Inlogo.png"
        width={40}
        height={40}
        alt="Logo"
      />

      {/* Search Bar */}
      <div className="flex-1 mx-4">
        <form className="flex items-center space-x-1 bg-gray-100 p-2 rounded-md max-w-96">
          <SearchIcon className="h-4 text-gray-600" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent flex-1 outline-none"
          />
        </form>
      </div>

      {/* Navigation Icons */}
      <div className="flex space-x-6 items-center">
        <div className="icon cursor-pointer">
          <HomeIcon className="h-6 w-6 text-gray-600" />
          <p>Home</p>
        </div>

        <div className="icon cursor-pointer hidden md:flex">
          <UserIcon className="h-6 w-6 text-gray-600" />
          <p>User</p>
        </div>

        <div className="icon cursor-pointer hidden md:flex">
          <BriefcaseIcon className="h-6 w-6 text-gray-600" />
          <p>Jobs</p>
        </div>

        <div className="icon cursor-pointer hidden md:flex">
          <MessageSquareIcon className="h-6 w-6 text-gray-600" />
          <p>Messages</p>
        </div>
        {/*User button if signed in*/}
        <SignedIn>
          <UserButton />
        </SignedIn>

        {/*User button if not signed in*/}
        <SignedOut>
          <Button asChild variant="secondary">
            <SignInButton />
          </Button>
        </SignedOut>
      </div>
    </div>
  );
}

export default Header;
