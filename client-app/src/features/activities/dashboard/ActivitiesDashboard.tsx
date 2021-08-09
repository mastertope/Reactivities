import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid, Sticky } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityForm from '../../form/ActivityForm';
import ActivityDetails from '../details/ActivityDetails';
import ActivityList from './ActivityList';

export default observer(function ActivitiesDashBoard() {
    const { activityStore } = useStore();
    const { selectedActivity, editMode } = activityStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <Sticky offset={55}>
                    {selectedActivity && !editMode && <ActivityDetails />}
                </Sticky>
                <Sticky offset={55}>
                    {editMode && <ActivityForm />}
                </Sticky>
            </Grid.Column>
        </Grid>
    )
})