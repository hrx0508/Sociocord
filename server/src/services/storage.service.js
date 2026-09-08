import dotenv from "dotenv";
dotenv.config()
import Imagekit from "imagekit";

const storageInstance = new Imagekit({
    urlEndpoint: process.env.IK_URL,
    publicKey: process.env.IK_PUB_KEY,
    privateKey: process.env.IK_PVT_KEY
})

const sendFiles = async (file, fileName) => {
    let obj = {
        file,
        fileName,
        folder: "Discord"
    }
    return await storageInstance.upload(obj);
}

export default sendFiles;