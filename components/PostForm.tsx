"use client";

import createPostAction from "@/actions/createPostAction";
import { useUser } from "@clerk/nextjs";
import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ImageIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

function PostForm() {
  const ref = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { user, isSignedIn, isLoaded } = useUser();

  const handlePostAction = async (formData: FormData): Promise<void> => {
    const formDataCopy = formData;
    ref.current?.reset();

    const text = formDataCopy.get("postInput") as string;

    if (!text) {
      throw new Error("You must provide a post input");
    }

    setPreview(null);

    try {
      await createPostAction(formDataCopy);
    } catch (error) {
      console.error(`Error creating post: ${error}`);

      // Display toast
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="mb-2">
      <form
        ref={ref}
        action={(formData) => {
          //Handle form submission with server action
          handlePostAction(formData);

          // Toast notification based on promise above
        }}
        className="p-3 bg-white rounded-lg border"
      >
        <div className="flex items-center gap-3  p-4 rounded-md  w-full">
          {/* Avatar */}
          <Avatar className="w-10 h-10 rounded-full overflow-hidden">
            <AvatarImage
              src={user?.imageUrl}
              className="w-full h-full object-cover"
              alt="User Avatar"
            />
            <AvatarFallback>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          {/* Post Input */}
          <input
            type="text"
            name="PostInput"
            placeholder="Start writing a post..."
            className="flex-1 bg-gray-100 rounded-full py-2 px-4 text-sm outline-none  focus:ring-2 border border-gray-300 transition w-3"
          />
          <input
            ref={fileInputRef}
            type="file"
            name="image"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
          <button type="submit" hidden>
            Post
          </button>
        </div>
        {/* {'Preview'} */}
        {preview && (
          <div className="flex justify-center">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-72 object-cover rounded-lg border border-gray-300"
            />
          </div>
        )}
        {/* {'Add Image'} */}
        <div className="flex justify-end mt-2 space-x-2">
          <Button type="button" onClick={() => fileInputRef.current?.click()}>
            <ImageIcon className="mr-2" size={16} color="currentColor" />
            {preview ? "Change Image" : "Add "}
          </Button>

          {preview && (
            <Button
              variant="outline"
              type="button"
              onClick={() => setPreview(null)}
            >
              <XIcon className="mr-2" size={16} color="currentColor" />
              Remove Image
            </Button>
          )}
        </div>
      </form>
      <hr className="my-4 border-gray-200" />
    </div>
  );
}

export default PostForm;
