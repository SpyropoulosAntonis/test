import { action, observable } from "mobx";
import { RootStore } from "./rootStore";

export default class ModalStore {
    rootstore:RootStore;
    constructor(rootstore:RootStore)
    {
     this.rootstore=rootstore;   
    }

    @observable.shallow modal ={
        open : false,
        body : null
    }

    @action openModal=(content:any ) => 
    {
        this.modal.open=true;
        this.modal.body=content;
        }

    @action closeModal=() =>
    {
        this.modal.open=false;
        this.modal.body=null;
    }
}