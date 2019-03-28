module.exports = {
    getAllImages(req, res) {
        const db = req.app.get('db')
        db.get_all_images().then(images => {
            // Build an object of images based on location key
            let imageContainer = {}
            imageContainer['all-images'] = images
            images.forEach(image => {
                if(imageContainer[image.location]) {
                    imageContainer[image.location].push(image)
                } else {
            imageContainer[image.location] = [image]
                }
            })
            res.status(200).send(imageContainer)
        }).catch(error => console.log('Error in getAllImages', error))
    }
}