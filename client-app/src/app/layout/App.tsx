import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivitiesDashBoard from '../../features/activities/dashboard/ActivitiesDashboard';
import agent from '../api/agent';
import {v4 as uuid} from 'uuid';
import LoadingComponent from './LoadingComponent';

function App() {
  //For handling Activity data state
  const [activities, setActivities] = useState<Activity[]>([]);
  //For handling selected Menu Item state  
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  //For handling Form edit state
  const [editMode, setEditMode] = useState(false);
  //For handling loading effect
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
      // console.log(response.data);
      let activities: Activity[] = []; 
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      });
      setActivities(activities);
      setLoading(false);
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
    setSubmitting(true);

    if (activity.id) {
      agent.Activities.update(activity).then(() =>{
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id=uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }

  }

  function handleDeleteActivity (id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    });

  }

  if (loading) return <LoadingComponent content='Loading app..' /> 

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
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

export default App;
