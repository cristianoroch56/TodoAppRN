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

  @action addSubListItem = async (
    categoryName,
    item,
    isDone,
    tag,
    isImportant,
    dob,
  ) => {
    this.subTodoList.push({
      name: item,
      categoryName: categoryName,
      isCompleted: isDone,
      tag: tag,
      isImportant: isImportant,
      dob: dob,
    });
  };

  @action storeCompleteSubList = async name => {
    const index = this.subTodoList.findIndex(item => item.name == name);
    const status = this.subTodoList[index].isCompleted;
    console.log('index', index, JSON.stringify(this.subTodoList));
    this.subTodoList[index].isCompleted = !status;
    console.log('index after', index, JSON.stringify(this.subTodoList));
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
}
const store = new TodoListStore();
export default store;
