import React,{useCallback,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Button,Input,Select,RTE} from "../index"
import appwriteSerive  from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PostForm({post}) {
	const navigate= useNavigate()
	const {register,handleSubmit,watch,setValue,control,getValues}=  useForm({
	defaultValues:{
		title:post?.title || ''	,
		slug:post?.slug || '',
		content: post?.content || '',
		status : post?.status || 'active'
	}
	})
	console.log("Post Form : ");
	
	const userData = useSelector(state=>state.auth.userData)
	console.log(userData);
	
	const submitPost = async (data)=>{
		if(post) {
			// edit form where we already have the post and we are only updating the required fields
			const file = data.image[0] ? appwriteSerive.uploadFile(data.image[0]) : null 
			/*
				Get a file by its unique ID. This endpoint response returns a JSON object
     			 with the file metadata.
			*/
			if(file){
				appwriteSerive.deleteFile(post.featuredImage)
			}
			console.log("Update Post");
			
			//Slug is the id of the post that u want to update, here it is the previous post.$id
			//This will return the dbPost Object that is updated
			const dbPost = await appwriteSerive.updatePost(post.$id,{...data,
				featuredImage: file ? file.$id : undefined
			})
			if(dbPost){
				navigate(`/post/${dbPost.$id}`)
			}
		}else{
			// Create post as we are filling the form to create Post
			const file = data.image[0] ? await appwriteSerive.uploadFile(data.image[0]) : null
			if(file){
				const fileId = file.$id
				data.featuredImage = fileId
				console.log(`userId: ${userData?.$id}`);
				
				const dbPost = await appwriteSerive.createPost({...data, userId:userData?.$id})
				// We spread the data and also remember that we never send the userID i.e any userData in the data
				// SO have to manually add the userId
				if(dbPost){
					navigate(`/post/${dbPost.$id}`)
				}
			}
		}

	}
	const slugTransform = useCallback((value)=>{
		if(value && typeof value==="string")
		{
			return value
					.trim()
					.toLowerCase()
					.replace(/[^a-zA-Z\d\s]+/g, "-")
                	.replace(/\s/g, "-");
		}
		return ""
	})
	useEffect(()=>{
		const subscription = watch((value,{name})=>{
			if(name==="title"){
				setValue("slug",slugTransform(value)) // setValue of slug to slugTransfrom(value)
			}
		})
		return ()=>{
			subscription.unsubscribe()
		}
	},[watch,slugTransform,setValue])
	return (
        <form onSubmit={handleSubmit(submitPost)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteSerive.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"} 
                </Button>
            </div>
        </form>
    );
}

export default PostForm