import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Meetups from './Meetups';
import MeetupDetails from './MeetupDetails';
import AddMeetup from './AddMeetup';
import About from './About';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Meetups} />
            <Route exact path='/about' component={About} />
            <Route exact path='/meetups/add' component={AddMeetup} />
            <Route exact path='/meetups/:id' component={MeetupDetails} />
        </Switch>
    </main>
)

export default Main;