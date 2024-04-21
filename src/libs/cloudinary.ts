import { v2 as cloudinary } from "cloudinary";
import * as fs from "fs";
import { extractPublicId, setConfig } from "cloudinary-build-url";

setConfig({
    cloudName: process.env.CLOUD_NAME,
});

export function config() {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
        secure: true,
    });
}
export async function upload(image: string) {
    try {
        const res = await cloudinary.uploader.upload(`src/uploads/${image}`, { folder: "GadgetHub" });
        fs.unlinkSync(`src/uploads/${image}`);
        return res;
    } catch (error) {
        throw error;
    }
}

export async function uploads(image: any[]) {
    try {
        const files = [];
        let i = 0;
        const len = image.length;
        for (i; i < len; i++) {
            files.push(
                (await cloudinary.uploader.upload(`src/uploads/${image[i].filename}`, { folder: "GadgetHub" }))
                    .secure_url
            ),
                fs.unlinkSync(`src/uploads/${image[i].filename}`);
        }
        return await Promise.all(files);
    } catch (error) {
        throw error;
    }
}

export async function del(image: string) {
    const publicId = extractPublicId(image);
    cloudinary.api.delete_resources([publicId]);
}

export async function dels(image: string[]) {
    const files = [];
    let i = 0;
    const len = image.length;
    for (i; i < len; i++) {
        const publicId = extractPublicId(image[i]);
        files.push(publicId);
    }
    cloudinary.api.delete_resources(files);
}
