const cloudinary=require("cloudinary").v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // your cloud name
    api_key: process.env.CLOUDINARY_API_KEY ,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
    cdn_subdomain: true,
})

const uploadImg = async (fileBuffer, publicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                public_id: publicId,
                resource_type: "auto" },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            }
        ).end(fileBuffer);
    });
};

module.exports={uploadImg}