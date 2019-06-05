import React from 'react';
import { Link } from 'react-router-dom'
import { withContext } from '../../ContextAPI/ContextHOC'
import './Portfolio.scss'

// TODO: Add some sort of image loading tool to prevent jarring rendering https://hackernoon.com/improve-your-ux-by-dynamically-rendering-images-via-react-onload-393fd4d0d946 ---- https://reactjs.org/docs/animation.html

function Portfolio(props) {
    const { userImages } = props.context
    // Ask Sydney if she wants to retain the masonry effect from current site
    return (
        <div className="portfolio-container">

            <h2>Projects</h2>
            <h4>Select a project to view details.</h4>

            <section className="projects-container">
            {userImages.portfolio && userImages.portfolio.map(project => {
                return (
                    <Link to={`/portfolio/${project.id}`} key={project.id}  className='project'>
                        <div>
                            <img src={project.images[0].url} alt={''}/>
                            {/* <div>{project.description}</div> */}
                        </div>
                    </Link>
                )
            })}
            </section>
            { props.context.user && <Link to='/portfolio/add'><button className='button'>Add New Project</button></Link> }
        </div>
    );
}

export default withContext(Portfolio)