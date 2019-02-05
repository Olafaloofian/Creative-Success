import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Portfolio.scss'

export default class PortfolioItem extends Component {
    state = {
        allItems: null,
        selectedItem: null
    }

    componentDidMount() {
        this.getDataFromSessionStorage()
    }

    // Get data from session storage and select one based off of route id parameter
    getDataFromSessionStorage = () => {
        const portfolioItems = JSON.parse(sessionStorage.getItem('portfolioItems'))
        const filteredItem = portfolioItems.find(item => item.id === +this.props.match.params.id)

        this.setState({
            allItems: portfolioItems,
            selectedItem: filteredItem
        })
    }

    // Handles same-component linking to render new data
    componentDidUpdate(prevProps) {
        if(prevProps.match.params.id !== this.props.match.params.id) {
            this.getDataFromSessionStorage()
            window.scrollTo(0, 0)
        }
    }

    render() {
        const { selectedItem, allItems } = this.state

        return (
            <div className='portfolio-item-container'>
                {allItems ?
                // Render main if the state has been set successfully
                    <section>
                        {this.state.selectedItem.pictureUrls.map((picture, index) => {
                            return (
                                <img src={picture} alt="" key={index}/>
                            )
                        })}
                        <div className="portfolio-item-description">
                            {this.state.selectedItem.description}
                        </div>
                        <div className='portfolio-item-footer'>
                            {/* The <a> tag reloads the page, and pictures show up one by one */}
                            <Link to={`/portfolio/${selectedItem === allItems[0] ? allItems.slice(-1)[0].id : selectedItem.id - 1}`}>
                                <nav>
                                    ◄ PREVIOUS PROJECT
                                </nav>
                            </Link>
                            {/* The <Link> keeps the user at the bottom and loads new images. Ask Sydney which is better. */}
                            <Link to={`/portfolio/${selectedItem === allItems.slice(-1)[0] ? allItems[0].id : selectedItem.id + 1}`}>
                                <nav>
                                    NEXT PROJECT ►
                                </nav>
                            </Link>
                        </div>
                    </section>
                    :
                    // Loading indicator
                    <img src="https://media2.giphy.com/media/9D2iQLabobsME/giphy.gif?cid=3640f6095c0ffa59457759714d022797" alt=""/>
                }
                
            </div>
        );
    }
}