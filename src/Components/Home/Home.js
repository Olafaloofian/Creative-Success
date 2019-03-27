import React from 'react'
import './Home.scss'
import FileDrop from '../Tools/FileDrop'
import Dropzone from 'react-dropzone'
import editsvg from '../../Assets/editsvg'
import { withContext } from '../../ContextAPI/ContextHOC';

function Home (props) {
    console.log('------------ props', props)

    return (
        <div className="centered-container">
            <section className='home-main'>
                <figure>
                    {JSON.parse(sessionStorage.getItem('home')).map(image => (
                        // Get images from session storage for this page and render <img> with image url
                        <React.Fragment key={image.url}>
                            <img src={image.url} alt={image.upload_date}/>
                            {editsvg}
                            {props.context.user && <div>React dropzone or other uploading functionality goes here</div>}
                        </ React.Fragment>
                    ))}
                </figure>
            </section>
            <hr/>
        </div>
    );
}

export default withContext(Home)