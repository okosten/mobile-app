import SearchStore from './searchStore';
import FormStore from './FormStore';
import UserStore from './UserStore';

//const formStore = new FormStore();






//class Root {
//  constructor() {
//    this.client = client;
//    this.searchStore = new SearchStore(this);
//    this.formStore = new FormStore(this);
//  }
//
//}

//const mainStore = new Root();

//const searchStore = new SearchStore();


//const formStore = new FormStore();



export default {
  searchStore: new SearchStore(),
  formStore: new FormStore(),
  userStore: new UserStore()
};