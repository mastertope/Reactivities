import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivitiesDashBoard from '../../features/activities/dashboard/ActivitiesDashboard';

function App() {
  //For handling Activity data state
  const [activities, setActivities] = useState<Activity[]>([]);
  //For handling selected Menu Item state  
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  //For handling Form edit state
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      // console.log(response.data);
      setActivities(response.data);
    })
    //empty array to prevent render loop
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateorEditActivity(activity: Activity) {
    activity.id
      ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
      : setActivities([...activities, activity]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity (id: string) {
    setActivities([...activities.filter(x => x.id !== id)]);
  }

  return (
    //this is jsx
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivitiesDashBoard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateorEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;
