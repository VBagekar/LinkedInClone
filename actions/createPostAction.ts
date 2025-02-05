'use server'

import { currentUser } from "@clerk/nextjs/server"

export default async function createPostAction(formData:FormData) {  
    const user=await currentUser();
    if(!user){
        throw new Error('user not authenticated');
    }
    const postInput=formData.get('PostInput') as string;
    const image=formData.get('image') as File;
    let imageUrl:string | undefined;
    if(!postInput){
        throw new Error('Post input is required');
    }
    //define use



    //upload image if there is const 
    
    //create a post in database
    
    // revalidatePath'/'-home page
    

}