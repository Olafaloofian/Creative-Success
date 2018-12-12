import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Portfolio.scss'

const projects = [
    {
        id: 1,
        pictureUrls: ['https://sydneyelizaflorals.files.wordpress.com/2018/11/img_0160.jpg?w=550', 'https://sydneyelizaflorals.files.wordpress.com/2018/11/img_0158.jpg?w=676&h=676&crop=1', 'https://sydneyelizaflorals.files.wordpress.com/2018/11/img_0160.jpg?w=676&h=676&crop=1', 'https://sydneyelizaflorals.files.wordpress.com/2018/11/img_0156.jpg?w=676&h=676&crop=1'],
        description: 'Photography by Bailey'
    },
    {
        id: 2,
        pictureUrls: ['https://sydneyelizaflorals.files.wordpress.com/2018/11/img_0433.jpg?w=550', 'https://sydneyelizaflorals.files.wordpress.com/2018/11/img_0432.jpg?w=676&h=676&crop=1', 'https://sydneyelizaflorals.files.wordpress.com/2018/11/img_0434.jpg?w=676&h=676&crop=1', 'https://sydneyelizaflorals.files.wordpress.com/2018/11/img_0436.jpg?w=676&h=676&crop=1'],
        description: 'Photography by Ciara'
    },
    {
        id: 3,
        pictureUrls: ['https://sydneyelizaflorals.files.wordpress.com/2018/11/img_0437.jpg?w=550', 'https://sydneyelizaflorals.files.wordpress.com/2018/09/img_8763.jpg?w=676&h=676&crop=1', 'https://sydneyelizaflorals.files.wordpress.com/2018/09/img_8762.jpg?w=676&h=676&crop=1', 'https://sydneyelizaflorals.files.wordpress.com/2018/11/img_0437.jpg?w=676&h=676&crop=1'],
        description: 'Photography by Brooke'
    },
    {
        id: 4,
        pictureUrls: ['https://sydneyelizaflorals.files.wordpress.com/2018/11/img_9034.jpg?w=550', 'https://sydneyelizaflorals.files.wordpress.com/2018/11/img_9150.jpg?w=676&h=676&crop=1', 'https://sydneyelizaflorals.files.wordpress.com/2018/11/img_9036.jpg?w=676&h=676&crop=1', 'https://sydneyelizaflorals.files.wordpress.com/2018/11/img_9153.jpg?w=676&h=676&crop=1'],
        description: 'Photography by Briana'
    }
]

// TODO: Add some sort of image loading tool to prevent jarring rendering https://hackernoon.com/improve-your-ux-by-dynamically-rendering-images-via-react-onload-393fd4d0d946 ---- https://reactjs.org/docs/animation.html

export default class Portfolio extends Component {
    state = {
        projects
    }

    // Saving projects info to session storage so there doesn't have to be any more server requests for this data. Is this more efficient? Maybe Context API would be better?
    componentDidMount() {
        sessionStorage.setItem('portfolioItems', JSON.stringify(projects))
    }

    render() {
        // Ask Sydney if she wants to retain the masonry effect from current site
        return (
            <div className="portfolio-container">

                <h2>Projects</h2>

                <section className="projects-container">
                {this.state.projects.map(project => {
                    return (
                        <Link to={`/portfolio/${project.id}`} key={project.id}  className='project'>
                            <div>
                                <img src={project.pictureUrls[0]} alt={project.description}/>
                                <div>{project.description}</div>
                            </div>
                        </Link>
                    )
                })}
                </section>
            </div>
        );
    }
}