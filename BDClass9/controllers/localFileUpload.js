const path = require('path');
const cloudinary = require('cloudinary').v2;
const File = require('../models/File')

exports.localFileUpload  = async(req, res)=>
    {
        try{    
                const file = req.files.file;
                console.log("file aa gayi ha ",file)

                const Path = __dirname + '/files/' + Date.now() + `.${file.name.split(".")[1]}`

                console.log("file path", path);

                file.mv(Path, ()=>{
                     console.log("kuch  gadbad nahi  ha");
                })

                res.json({
                    success:true,
                    messgae:"file Upload successfully"

                })
        }
        catch(err){
            console.error(err);
            process.exit(1);

        }
    }


 function filevalidate(filetype, format){
    
    return filetype.includes(format);
    

}

const uploadToCloud = async(file, folder, quality)=>{
    const options = {folder}
    if(quality){
        options.quality=quality
    }

    options.resource_type='auto'

    return await cloudinary.uploader.upload(file.tempFilePath, 
        options

    )

}

exports.imageUpload = async(req,res)=>{
    try{
        const {name, tags, email} = req.body;
        const file = req.files.imageFile;

        const filetype = ['jpeg', 'jpg', 'png']
        const type = file.name.split('.')[1].toLowerCase();

        const validateimage = filevalidate(filetype, type)

        if(!validateimage){
            return res.json({
                success:false,
                message:"File type not supported"
            })
        }

        const upload = await uploadToCloud(file,'Dhruv' );
        
        const uploadtodb = await File.create({
            name,
            tags,
            email,
            imageUrl:upload.secure_url
        })
        return res.json({
            success:true,
            image:upload.secure_url,
            message:"file upload successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"the image is not found"
        })

    }
}

exports.videoUpload = async(req,res)=>{
    try{
        const {name, tags, email } = req.body;
        const file = req.files.videoUpload

        console.log("File aa gayi ha", file);

        const filetype = file.name.split('.')[1].toLowerCase();
        const supportedType = ["mp4", "mov"]

        // check filetype is supported or not and also check whether the size of file is not greater than 5 Mb
        const validatevideo = filevalidate(supportedType, filetype);
        if(!validatevideo){
        return res.json({
            success:false,
            message:"file is not valid according to guideline"
        })
        }

        // upload on cloudinary
        const uploadtocloud = await uploadToCloud(file,"Dhruv");
        console.log(uploadtocloud);

        const dbstore = await File.create({
            name, 
            tags,
            email,
            imageUrl:uploadtocloud.secure_url
        })

        return res.json({
            success:true,
            image:uploadtocloud.secure_url,
            message:"video upload successfully"
        })



    }
    catch(err){
        res.status(400).json({
            success:false,
            message:"when you upload then something wrong"
        })
    }
}


exports.imageSizeReduced = async(req,res)=>{
    try{
        const {name,tags, email} = req.body;
        const file = req.files.reduceImage;
        console.log(file);

        const supportedType = ["png", "jpeg", 'jpg'];
        const fileType = file.name.split('.')[1].toLowerCase();

        //check whether the file is supported or not

        const validateImage = filevalidate(supportedType, fileType)

        if(!validateImage){
            return res.json({
                success:false,
                message:"file is not supported"
            })

        }

        const uploadtocloud = await uploadToCloud(file,"Dhruv", 30);
        console.log(uploadtocloud)

        const uploadToDb = await File.create({
            name, tags, email, imageUrl:uploadtocloud.secure_url
        })

        return res.json({
            success:true,
            message:"Upload successfully"
        })

    }
    catch(err){
    console.error("imageSizeReduced error:", err);  // <-- will show the real issue in console
    res.status(400).json({
        success:false,
        message:"Something went wrong during image size reduction",
        error: err.message // optional: helps debugging on frontend
    });
}

}