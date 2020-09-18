import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../Models/activity';



axios.defaults.baseURL = 'https://localhost:44312/api/';

const reponseBody = (response: AxiosResponse) => response.data;

const sleep =(ms : number) =>(response : AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response),ms));

const requests =
{
    get: (url: string) => axios.get(url).then(sleep(1000)).then(reponseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(reponseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(reponseBody),
    del: (url: string) => axios.delete(url).then(sleep(1000)).then(reponseBody)
}

const Activities =
{
    list :():Promise<IActivity[]> => requests.get('/activities'),
    details : (id:string) => requests.get(`/activities/${id}`),
    create : (activity : IActivity)=>requests.post('/activities',activity),
    update : (activity : IActivity)=> requests.put(`/activities/${activity.id}`,activity),
    delete : (id:string) =>requests.del(`/activities/${id}`)
}

export default {
    Activities
}