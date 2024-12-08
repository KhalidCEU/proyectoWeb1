
import { Image } from "../schemas/image";
import { AsyncRequestHandler } from "../types/requests";
import { getDecodedToken } from "../utils/jwtUtils";

export const upload: AsyncRequestHandler = async (req, res) => {
    try {
        const decodedAuthToken = getDecodedToken(req.headers.cookie || "");
        const userId = decodedAuthToken?.userId;
        const type = req.body.type;

        if (!req.file) {
            return res
                .status(400)
                .json({ message: "No files uploaded", status: 'failure'})
        }

        const imageFile = req.file;

        if (!userId) {
            return res
                .status(401)
                .json({ message: "You must be authenticated to upload an image", status: 'failure'})
        }

        if (!['avatar', 'product'].includes(type)) {
            return res.status(400)
                .json({ message: "Invalid image type", status: 'failure' });
        }

        const newImage = new Image({
            imageFile: imageFile.buffer,
            contentType: imageFile.mimetype,
            userId: userId,
            type: type
        })

        await newImage.save();

        const imageUrl = `${req.protocol}://${req.get('host')}/api/images/${newImage._id}`;

        return res
            .status(201)
            .json({
                items: newImage,
                imageUrl: imageUrl,
                message: 'Image uploaded succesfully.',
                status: 'success'
            })

    } catch (error) {
        console.error('Image uploa error: ', error);
        return res
            .status(500)
            .json({ message: 'Error uploading image;', status: 'failure'});
    }
}


export const get: AsyncRequestHandler = async (req, res) => {
    try {
        const imageId = req.params.id;

        const image = await Image.findById(imageId);

        if (!image) {
            return res.status(404)
                .json({
                    message: 'Image not found.',
                    status: 'failure'
                })
        }

        return res
            .set('Content-Type', image.contentType)
            .status(200)
            .send(image.imageFile);

    } catch (error) {
        console.error('Image fetching error: ', error);
        return res
            .status(500)
            .json({ message: 'Error getting image;', status: 'failure'});
    }
}

