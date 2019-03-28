import React, { useEffect } from 'react'
import './Home.scss'
import FileDrop from '../Tools/FileDrop'
import Dropzone from 'react-dropzone'
import editsvg from '../../Assets/editsvg'
import { withContext } from '../../ContextAPI/ContextHOC';

function Home (props) {
    console.log('------------ props', props)
    const homeImages = props.context.userImages.home

    return (
        <div className="centered-container">
            <section className='home-main'>
                <figure>
                    {homeImages && homeImages.map(image => (
                        // Get images from session storage for this page and render <img> with image url
                        <div key={image.url}>
                            <img src={image.url} alt={image.upload_date}/>
                            {props.context.user && <div className='edit-container'>{editsvg}</div>}
                        </div>
                    ))}
                </figure>
            </section>
            <hr/>
        </div>
    );
}

export default withContext(Home)