
import { configure } from "mobx";
import { createContext } from "react";
import ActivityStore from "./activityStore"
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./UserStore";

configure({ enforceActions: 'always' });

export class RootStore {
    activitiesStore : ActivityStore;
    userStore : UserStore;
    commonStore : CommonStore;
    modalStore : ModalStore;

    constructor(){
        this.activitiesStore= new ActivityStore(this);
        this.userStore = new UserStore (this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore (this);
    }
}

export const RootStoreContext = createContext(new RootStore());
