import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class EditMeetup extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            city: '',
            address: ''
        }
    }

    componentWillMount(){
        this.getMeetupDetails();
    }

    getMeetupDetails(){
        // Getting the ID from the URL (match.params) 
        let meetupId = this.props.match.params.id;
        axios.get(`http://localhost:3000/api/meetups/${meetupId}`)
        .then(response => {
            this.setState({
                id: response.data.id,
                name: response.data.name,
                city: response.data.city,
                address: response.data.address,
            }, () => {
                console.log(this.state);
            });
        })
        .catch(err => console.log(err));
    }

    // UPDATE (PUT)
    editMeetup(newMeetup){
        axios.request({
            method: 'PUT',
            url: `http://localhost:3000/api/meetups/${this.state.id}`,
            data: newMeetup
        }).then(response => {
            // we are able to access props.history bc of the router
            // the router adds this history object
            // push will redirect us to home
            this.props.history.push('/');
        }).catch(err => console.log(err));
    }
    
    onSubmit = (e) => {
        const newMeetup = {
            name: this.refs.name.value,
            city: this.refs.city.value,
            address: this.refs.address.value
        }
        this.editMeetup(newMeetup);
        e.preventDefault();
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        // name refers to the name attribute in input 
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render(){
        return(
            <div>
                <br />
                <Link className="btn grey" to="/">Back</Link>
                <h1>Edit Meetup</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="input-field">
                        <input type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange}/>
                        {/* Add class="active" to label bc label name overlapping input field value */}
                        <label className="active" htmlFor="name">Name</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="city" ref="city" value={this.state.city} onChange={this.handleInputChange}/>
                        <label className="active" htmlFor="city">City</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="address" ref="address" value={this.state.address} onChange={this.handleInputChange}/>
                        <label className="active" htmlFor="address">Address</label>
                    </div>
                    <input type="submit" value="Save" className="btn" />
                </form>
            </div>
        )
    }
}

export default EditMeetup;