import { action, computed, observable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { IUser, IUserFormaValue } from "../Models/User";
import { RootStore } from "./rootStore";

export default class UserStore {
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    @observable user: IUser | null = null;

    @computed get isLoggedIn() { return !!this.user }

    @action register = async (values: IUserFormaValue) => {
        try {
            const user = await agent.User.register(values);
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            history.push('/activities');

        } catch (error) {
            runInAction(() => {
                console.log(error);
                throw error;
            })
        }
    }

    @action login = async (values: IUserFormaValue) => {
        try {
            const user = await agent.User.login(values);
            runInAction(
                () => {
                    this.rootStore.commonStore.setToken(user.token);
                    this.user = user;
                    console.log(values);
                    console.log(user);
                    history.push('/activities')
                    this.rootStore.modalStore.closeModal();
                }

            )

        } catch (error) {
            runInAction(() => {
                console.log(error)
                throw error
            })

        }
    }
    @action getUser = async () => {
        try {
            console.log('Rotao gia user');
            const user = await agent.User.current();
            runInAction(() => {
                this.user = user;
                console.log(user);
            })

        } catch (error) {
            runInAction(() => {
                console.log(error);
                console.log(this.user);
            })
        }
    }
    @action logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;
        history.push('/');
    }
}