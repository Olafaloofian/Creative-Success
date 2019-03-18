import React from 'react'
import './Home.scss'
import Dropzone from 'react-dropzone'
import { withContext } from '../../ContextAPI/ContextHOC';

function Home (props) {
    console.log('------------ props', props)

    const onDrop = (file) => {
        console.log('------------ file', file)
    }

    return (
        <div className="centered-container">
            <section className='home-main'>
                <figure>
                    <img src="https://sydneyelizaflorals.files.wordpress.com/2018/11/img_9036.jpg?w=336&h=336&crop=1" alt=""/>
                    {/* HERE */}
                    {props.context.user && 
                        <Dropzone onDrop={file => onDrop(file)} >
                            {/* <p>Try dropping some files here, or click to select files to upload.</p> */}
                        </Dropzone>
                    }
                    <img src="https://sydneyelizaflorals.files.wordpress.com/2018/11/img_9034.jpg?w=336&h=336&crop=1" alt=""/>
                    <img src="https://sydneyelizaflorals.files.wordpress.com/2018/11/img_9153.jpg?w=336&h=336&crop=1" alt=""/>
                    <img src="https://sydneyelizaflorals.files.wordpress.com/2018/11/img_9150.jpg?w=336&h=336&crop=1" alt=""/>
                </figure>
            </section>
            <hr/>
        </div>
    );
}

export default withContext(Home)