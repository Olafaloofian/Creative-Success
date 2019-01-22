import React from 'react';
import './About.scss'

const About = () => {
    return (
        <div className="centered-container">
            <h2>About</h2>
            <figure>
                <img src="https://sydneyelizaflorals.files.wordpress.com/2018/03/4b29eba7-526f-4585-a6dd-8ef247829dff.jpeg?w=677&h=509" alt="Sydney"/>
            </figure>
            <section className='about-info'>
                <p>Welcome to Sydney Eliza Florals!</p>
                <p>My name is Sydney, and I am passionate about creating beauty and expression through floral design. I am, and always have been, a lover of all things floral. I am inspired by organic styles, texture, and romantic colors.</p>
                <p>I was born and raised in sunny Arizona. Some of the many things that make me happy include my husband, camping, going to concerts, cooking, summer weather, sleeping in, and traveling.</p>
                <p>If you are in need of florals for any occasion feel free to reach out –I’d absolutely love to make something beautiful for you!</p>
                <br/>

                <p>xoxo</p>
                <p>Sydney</p>
            </section>
        </div>
    );
};

export default About;