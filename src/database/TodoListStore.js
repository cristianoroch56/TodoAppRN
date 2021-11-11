import {
  observable,
  action,
  computed,
  makeAutoObservable,
  runInAction,
} from 'mobx';
import {isEmpty} from '../constants/Utils';

let index = 0;

class TodoListStore {
  @observable todoLists = [];
  @observable subTodoList = [];
  @observable categoryName = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action addSubListItem = async (categoryName, item) => {
    this.subTodoList.push({
      name: item,
      categoryName: categoryName,
    });
  };

  @action addItem = async item => {
    this.todoLists.push({name: item});
  };

  @action setCategoryName = async name => {
    this.categoryName = name;
  };

  removeListItem(item) {
    this.todoLists = this.todoLists.filter(l => {
      return l.name !== item;
    });
  }

  removeSubListItem(item) {
    this.subTodoList = this.subTodoList.filter(l => {
      return l.name !== item;
    });
  }

  getFilterSubTodoList(todoName) {
    if (!isEmpty(todoName)) {
      const tempSubList = this.subTodoList.filter(
        item => item.categoryName == todoName,
      );
      return tempSubList;
    } else {
      return this.subTodoList;
    }
  }

  //To get Todo value
  @computed get getTodoList() {
    return this.todoLists;
  }

  //To get Todo value
  @computed get getSubTodoList() {
    return this.subTodoList;
  }
}
const store = new TodoListStore();
export default store;
