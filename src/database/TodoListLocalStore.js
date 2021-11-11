import Realm from 'realm';

export const TO_DO_LIST = 'ToDoList';
export const SUB_TO_DO_LIST = 'SubToDoList';

export const ToDoList = {
  name: TO_DO_LIST,
  properties: {
    name: 'string?',
  },
};

export const SubToDoList = {
  name: SUB_TO_DO_LIST,
  properties: {
    name: 'string?',
    categoryName: 'string?',
  },
};

const databaseOptions = {
  path: 'TodoApp.realm',
  schema: [ToDoList, SubToDoList],
  schemaVersion: 0, //optional
};

export const insertTodo = newTodoValue =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(TO_DO_LIST, newTodoValue);
          resolve(newTodoValue);
        });
      })
      .catch(error => reject(error));
  });

export const insertSubTodo = newTodoValue =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(SUB_TO_DO_LIST, newTodoValue);
          resolve(newTodoValue);
        });
      })
      .catch(error => reject(error));
  });

export const queryAllSubTodoLists = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let allSubTodoLists = realm.objects(SUB_TO_DO_LIST);
        resolve(allSubTodoLists);
      })
      .catch(error => {
        reject(error);
      });
  });

export const queryAllTodoLists = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let allTodoLists = realm.objects(TO_DO_LIST);
        resolve(allTodoLists);
      })
      .catch(error => {
        reject(error);
      });
  });

export const deleteTodoList = name =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let todoItem = realm.objects(TO_DO_LIST);
          todoItem = todoItem.filter(item => item.name == name);
          console.log('todoItem', JSON.stringify(todoItem));
          realm.delete(todoItem);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const deleteSubTodoList = name =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let subTodoItem = realm.objects(SUB_TO_DO_LIST);
          subTodoItem = subTodoItem.filter(item => item.name == name);
          realm.delete(subTodoItem);
          resolve();
        });
      })
      .catch(error => reject(error));
  });
