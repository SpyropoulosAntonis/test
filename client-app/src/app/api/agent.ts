import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { IActivity } from '../Models/activity';



axios.defaults.baseURL = 'https://localhost:44312/api/';
axios.interceptors.response.use(undefined, (error) => {
    console.log(error);

    if (error.message === 'Network Error' && !error.response) {
        toast.error("Network error")
        console.log("Network error ")
    }
    const { status, data, config } = error.response;
    if (status === 404) {
        history.push('/NotFound');
    }
    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('ID')) {
        history.push('/NotFound');
    }

    if (status === 500) {
        toast.error("Server errror");
        toast.info("Ενημερώθηκε για το σφάλμα")
        toast.success("Done");
        console.log('Toast');
    }

    throw error;
});

const reponseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests =
{
    get: (url: string) => axios.get(url).then(sleep(1000)).then(reponseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(reponseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(reponseBody),
    del: (url: string) => axios.delete(url).then(sleep(1000)).then(reponseBody)
}

const Activities =
{
    list: (): Promise<IActivity[]> => requests.get('/activities'),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post('/activities', activity),
    update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del(`/activities/${id}`)
}

export default {
    Activities
}