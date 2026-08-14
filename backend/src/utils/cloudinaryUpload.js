import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "blogger/blog-media",
    resource_type: "auto",
  });

  return {
    secureUrl: result.secure_url,
    publicId: result.public_id,
    resourceType: result.resource_type,
  };
};


const deleteFromCloudinary = async(publicId,  resourceType = "auto")=>{
    if(!publicId){
        return null
    }

    const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
        invalidate : true
    })

    return result
}

export {uploadToCloudinary, deleteFromCloudinary};