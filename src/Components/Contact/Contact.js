import React from 'react';
import './Contact.scss'
import axios from 'axios'

class Contact extends React.Component {
    state={
        name: '',
        email: '',
        eventDate: '',
        comment: ''
    }

    submitMessage = this.submitMessage.bind(this)

    handleChange = (type, val) => {
        this.setState({
            [type]: val
        })
    }

    async submitMessage(e) {
        e.preventDefault()
        const {name, email, eventDate, comment} = this.state
        const emailResponse = await axios.post('/api/contact/email', {name, email, eventDate, comment})
        if(emailResponse.status === 200) {
            this.setState({
                name: '',
                email: '',
                eventDate: '',
                comment: ''
            })
            alert('Email Sent!')
        } else {
            alert('Oops! There has been an error. Please try again at a later time')
        }
    }

    render() {
        return (
            <div className="contact-container">
                <h2>Contact</h2>
                <figure>
                    <img src="https://sydneyelizaflorals.files.wordpress.com/2018/11/img_9153.jpg?w=680" alt="Sydney"/>
                </figure>
                <h4> I would love to hear from you! </h4>
                <section>
                    <form>
                        <h3>Name:</h3>
                        <input required type='text' value={this.state.name} onChange={(e) => this.handleChange('name', e.target.value)} />
                        <h3>Email:</h3>
                        <input required type='text' value={this.state.email} onChange={(e) => this.handleChange('email', e.target.value)}  />
                        <h3>Event Date:</h3>
                        <input required type='date' value={this.state.eventDate} onChange={(e) => this.handleChange('eventDate', e.target.value)} />
                        <h3>Comment:</h3>
                        <textarea required value={this.state.comment} onChange={(e) => this.handleChange('comment', e.target.value)} />
                        <br/>
                        <button type='button' onClick={(e) => this.submitMessage(e)}> Submit </button>
                    </form>
                </section>
            </div>
        );
    }
};

export default Contact;