import { observable, action, computed, runInAction } from 'mobx';
import {SyntheticEvent } from 'react';
import { IActivity } from '../Models/activity';
import agent from '../api/agent';
import { history } from '../..';
import { RootStore } from './rootStore';




export default class ActivityStore {
    rootStore : RootStore
    constructor (rootStore : RootStore) 
    {
        this.rootStore =rootStore;
    }

    @observable activities: IActivity[] = []
    @observable loadingInitial = false;
    @observable selectedActivity: IActivity | undefined;
    @observable editMode = false;
    @observable submiting = false;
    @observable activityRegistry = new Map();
    @observable target = '';

    @computed get activitiesByDate() {
        return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()))
    }

    groupActivitiesByDate(activities: IActivity[]) {
        const sortedActivities = activities.sort((a, b) => a.date.getTime() - b.date.getTime());

        return Object.entries(sortedActivities.reduce((activities, activity) => {
            const date = activity.date.toISOString().split('T')[0];
            activities[date] = activities[date] ? [...activities[date], activity] : [activity];
            return activities;
        },
            {} as { [dokimi: string]: IActivity[] })
        );
    }

    //Φόρτωση των Activities
    @action loadingActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list()
            runInAction(() => {
                activities.forEach(activity => {
                    activity.date = new Date(activity.date);
                    this.activityRegistry.set(activity.id, activity);
                });
                this.loadingInitial = false;

            })
            console.log(this.groupActivitiesByDate(activities))
            //console.log(activities[0])
        } catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
        }



    }
    //Επιλογή του Activity
    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = false;
    }
    //Δημιουργία Activity 
    @action createActivity = async (activity: IActivity) => {
        this.submiting = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.editMode = false;
                this.selectedActivity = activity;
                this.submiting = false;
            })
            history.push(`/activities/${activity.id}`);


        } catch (error) {
            runInAction(() => {
                this.submiting = false;
                console.log(error);
            })
        }
    }

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedActivity = undefined;
    }
    //Επεξεργασία Activity 
    @action editActivity = async (activity: IActivity) => {
        this.submiting = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.submiting = false;
            })
            history.push(`/activities/${activity.id}`);
        } catch (error) {
            runInAction(() => {
                this.submiting = false;
                console.log(error);
            })
        }
    }

    @action openEditForm = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = true;
    }
    @action cancelSelectedActivity = () => {
        this.selectedActivity = undefined;

    }

    @action cancelFormOpen = () => {
        this.editMode = false;
    }
    //Διαγραφή Activity 
    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submiting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.submiting = false;
                this.target = '';
            })


        } catch (error) {
            runInAction(() => {
                this.submiting = false;
                this.target = '';
                console.log(Error);
            })
        }
    }

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        }
        else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                runInAction(() => {
                    activity.date=new Date (activity.date);
                    this.selectedActivity = activity;
                    this.activityRegistry.set(activity.id, activity);
                    this.loadingInitial = false;
                    console.log(this.selectedActivity);
                    
                })
                return activity;
            } catch (error) {

                runInAction(() => {
                    this.loadingInitial = false;
                })
                console.log('error');
                return activity;
            }

        }

    }
    getActivity =  (id: string) => {
        return this.activityRegistry.get(id);
    }

    @action clearActivity =  () => {
        this.selectedActivity = undefined;
    }
}

