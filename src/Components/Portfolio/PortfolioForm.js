import React from 'react';
// TODO: I could probably make some more reusable styling, like 'General' or something to put form styling in.
import '../Contact/Contact.scss'
import { withContext } from '../../ContextAPI/ContextHOC'
import { Link, Redirect } from 'react-router-dom'
import LoadingDots from '../../Assets/LoadingDots/LoadingDots';
import axios from 'axios'

class PortfolioForm extends React.Component {
    state={
        projectName: '',
        description: '',
        coverImage: null,
        additionalImages: [],
        notification: '',
        submitting: false
    }

    submitProject = this.submitProject.bind(this)
    handleFileUpload = this.handleFileUpload.bind(this)

    handleChange = (type, val) => {
        this.setState({
            [type]: val
        })
    }

    async handleFileUpload(isCoverPhoto, e) {
        if (!e.target.files[0]) {
            return
        }
        const formData = new FormData()
        formData.append('image', e.target.files[0], e.target.files[0].name)
        if (isCoverPhoto) {
            this.setState({
                coverImage: 'loading'
            })
            const uploadResponse = await axios.post('/api/image-upload', formData)
            if (uploadResponse.status === 200) {
                this.setState({
                    coverImage: uploadResponse.data.imageUrl
                })
            }
        } else {
            this.setState(prevState => ({ additionalImages: ['loading', ...prevState.additionalImages] }))
            const uploadResponse = await axios.post('/api/image-upload', formData)
            if (uploadResponse.status === 200) {
                let newImageList = [...this.state.additionalImages, uploadResponse.data.imageUrl]
                // Remove the loading indicator
                newImageList.shift()
                this.setState(prevState => ({ additionalImages: newImageList }))
            } else {
                console.error('Image upload error!', uploadResponse.data)
            }
        }
    }

    async submitProject(e) {
        e.preventDefault()
        this.setState({
            submitting: true,
            notification: 'Submitting...'
        })
        const { projectName, description, coverImage, additionalImages } = this.state

        if (!projectName || !coverImage || coverImage === 'loading') {
            return alert('Please make sure to have a valid Project Name and Cover Photo')
        }

        const body = { projectName, description, coverImage, additionalImages }

        const portfolioResponse = await axios.post('/api/portfolio', body)
        if (portfolioResponse.status === 200) {
            this.setState({
                submitting: false,
                notification: 'Project submitted!',
                projectName: '',
                description: '',
                coverImage: '',
                additionalImages: ''
            })
            this.props.context.methods.refetchImages()
        } else {
            console.error('Error posting new project!')
        }
    }

    render() {
        const { projectName, description, coverImage, additionalImages, notification, submitting } = this.state
        if (!this.props.context.user) {
            return <Redirect to='/' />
        }
        return (
            <div className="portfolio-container">
                <h2>Add a Portfolio Project</h2>
                {notification && <h4>{notification}</h4>}
                <section>
                    <form>
                        <h3>Project Name:</h3>
                        <input required type='text' value={projectName} onChange={(e) => this.handleChange('projectName', e.target.value)} />
                        <h3>Description:</h3>
                        <input placeholder='(Optional)' type='text' value={description} onChange={(e) => this.handleChange('description', e.target.value)}  />
                        <h3>Cover Photo:</h3>
                        {/* TODO: fix upload button CSS- https://blog.benestudio.co/custom-file-upload-button-with-pure-css-5aacf39aa0a and picture layout CSS */}
                        {/* TODO: add button for removing/changing an image (splice from array, etc) */}
                        <input required type='file' className='file-input' onChange={(e) => this.handleFileUpload(true, e)} />
                        { coverImage === 'loading' ? <LoadingDots /> : coverImage ? <img src={coverImage} style={{width: '300px', margin: '15px'}} alt='Sydney Eliza Florals' /> : '' }
                        <h3>Additional Photos:</h3>
                        <input type='file' className='file-input' onChange={(e) => this.handleFileUpload(false, e)} />
                        { additionalImages.length > 0 && additionalImages.map((e, i) => e === 'loading' ? <LoadingDots key={i}/> : <img key={i} src={e} style={{width: '300px', margin: '15px'}} alt='Sydney Eliza Florals' />)}
                        <br/>
                        {submitting ? <LoadingDots /> : <button type='button' onClick={(e) => this.submitProject(e)}> Submit </button>}
                    </form>
                    <Link to='/portfolio'><button>Back to Portfolio</button></Link>
                </section>
            </div>
        );
    }
};

export default withContext(PortfolioForm);