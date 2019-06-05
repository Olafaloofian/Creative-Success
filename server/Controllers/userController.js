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
            // Rearrange the portfolio pictures to be more useable - maybe make a database function for this?
            if (imageContainer.portfolio) {
                let rearrangedPortfolio = []
                imageContainer.portfolio.map(image => {
                    if (rearrangedPortfolio.find(project => project.id === image.project_id)) {
                        const projectIndex = rearrangedPortfolio.findIndex(project => project.id === image.project_id)
                        rearrangedPortfolio[projectIndex].images.push(image)
                    } else {
                        rearrangedPortfolio.push({ id: image.project_id, images: [image] })
                    }
                })
                // Put the cover image in the front of the array
                rearrangedPortfolio.forEach(project => {
                    project.images.sort((a, b) => a === b ? 0 : a ? -1 : 1)
                })
                imageContainer.portfolio = rearrangedPortfolio
            }

            res.status(200).send(imageContainer)
        }).catch(error => console.log('Error in getAllImages', error))
    },

    addProject(req, res) {
        const { projectName, description, coverImage, additionalImages } = req.body
        const user_id = req.session.user.id
        const db = req.app.get('db')
        db.add_project({ project_name: projectName, user_id, description}).then(project => {
            const project_id = project[0].id
            db.add_image({ user_id, url: coverImage, location: 'portfolio', project_id, cover_image: true})
            .catch(error => {
                console.log('Error adding cover image', error)
                res.status(500).send('Error adding cover image.')
            })
            if (additionalImages.length > 0) {
                additionalImages.forEach(image => {
                    if (image !== 'loading') {
                        db.add_image({ user_id, url: image, location: 'portfolio', project_id, cover_image: false })
                        .catch(error => {
                            console.log('Error adding image', error)
                            res.status(500).send('Error adding image.')
                        })
                    }
                })
            }
            res.status(200).send(project)
        })
    }
}