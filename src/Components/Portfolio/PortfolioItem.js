import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withContext } from '../../ContextAPI/ContextHOC'
import LoadingDots from '../../Assets/LoadingDots/LoadingDots'
import './Portfolio.scss'

class PortfolioItem extends Component {
    state = {
        allItems: null,
        selectedItem: null
    }

    componentDidMount() {
        const { userImages } = this.props.context
        userImages.portfolio && this.setState({
            selectedItem: userImages.portfolio.find(project => project.id === this.props.match.params.id),
            allItems: userImages.portfolio
        })
    }

    // Handles same-component linking to render new data
    componentDidUpdate(prevProps) {
        const { userImages } = this.props.context
        if(prevProps.match.params.id !== this.props.match.params.id || prevProps.context.userImages !== userImages) {
            this.setState({
                selectedItem: userImages.portfolio.find(project => project.id === this.props.match.params.id),
                allItems: userImages.portfolio
            })
            window.scrollTo(0, 0)
        }
    }

    nextProject = (selectedItem, isForward) => {
        const { allItems } = this.state
        const index = allItems.findIndex(e => e === selectedItem)
        if (isForward) {
            if (index === allItems.length - 1) {
                return allItems[0].id
            } else {
                return allItems[index + 1].id
            }
        } else {
            if (index === 0) {
                return allItems[allItems.length - 1].id
            } else {
                return allItems[index - 1].id
            }
        }
    }

    render() {
        const { selectedItem, allItems } = this.state

        return (
            <div className='portfolio-item-container'>
                {allItems ?
                    <section>
                        {selectedItem.images.map((image, index) => {
                            return (
                                <img src={image.url} alt="" key={index}/>
                            )
                        })}
                        <div className="portfolio-item-description">
                        </div>
                        <div className='portfolio-item-footer'>
                            {/* The <a> tag reloads the page, and pictures show up one by one */}
                            <Link to={`/portfolio/${this.nextProject(selectedItem, false)}`}>
                                <nav>
                                    ◄ PREVIOUS PROJECT
                                </nav>
                            </Link>
                            {/* The <Link> keeps the user at the bottom and loads new images. Ask Sydney which is better. */}
                            <Link to={`/portfolio/${this.nextProject(selectedItem, true)}`}>
                                <nav>
                                    NEXT PROJECT ►
                                </nav>
                            </Link>
                        </div>
                    </section>
                    :
                    // Loading indicator
                    <div className='loader'><LoadingDots /></div>
                }
                
            </div>
        );
    }
}

export default withContext(PortfolioItem)