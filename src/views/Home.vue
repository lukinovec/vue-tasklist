<template>
  <div class="tasks w-1/2 h-5/6 flex bg-white rounded-3xl shadow-xl">
    <div class="flex flex-col flex-1 p-4 overflow-y-auto">
      <div class="p-8 m-4">
        <input
          @keyup.enter="add({ name: newTask, status: false })"
          v-model="newTask"
          class="text-2xl text-center p-2 m-4 w-2/5 border-b border-gray-200"
          type="text"
          placeholder="Add new task"
        />
        <button
          @click="add({ name: newTask, status: false })"
          class="p-3 shadow-md rounded-xl border border-gray-100"
        >
          Add
        </button>
      </div>
      <div class="flex flex-1 justify-center">
        <div class="w-5/6 text-left mx-48">
          <div class="flex w-full p-1 pb-2 font-bold" id="head">
            <div v-if="tasks.length > 0" class="w-5/6">Task name</div>
            <div v-else class="w-5/6">Add a task</div>
            <!-- <div class="w-1/6">Complete</div> -->
          </div>
          <template :key="task" v-for="task in tasks">
            <div class="flex p-2 w-full border-b">
              <div class="w-5/6 text-2xl">{{ task.name }}</div>
              <div class="w-1/6">
                <button
                  @click="update(task)"
                  class="ml-2 p-2 border border-gray-100 hover:bg-green-400 hover:text-white text-xl rounded-xl"
                  :class="{ 'bg-green-400 text-white': task.status }"
                >
                  ✓
                </button>
                <button
                  @click="remove(task)"
                  class="ml-2 p-2 border border-gray-100 hover:bg-red-400 text-xl rounded-xl"
                >
                  X
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import firebase from "firebase";

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBnH8xuYD2BLbr87jDWy6RwP3oDq8d5-SQ",
  authDomain: "tasklist-54a1a.firebaseapp.com",
  projectId: "tasklist-54a1a",
  storageBucket: "tasklist-54a1a.appspot.com",
  messagingSenderId: "50634212071",
  appId: "1:50634212071:web:9c4d4a3a23a56425b89842",
  measurementId: "G-F3KQ8DPRDQ",
});

interface Task {
  id: string;
  name: string;
  status: boolean;
}

export default defineComponent({
  name: "Tasks",
  data: function () {
    return {
      tasks: [] as Task[],
      newTask: "",
    };
  },

  methods: {
    add: function (task: Task) {
      firebase
        .firestore()
        .collection("/tasks")
        .where("name", "==", task.name)
        .get()
        .then((doc) => {
          if (doc.empty) {
            firebase.firestore().collection("/tasks").add(task);
            this.tasks.push(task);
          } else {
            alert("Error: task already exists");
          }
        });
    },

    update: function (task: Task) {
      task.status = !task.status;
      firebase
        .firestore()
        .collection("/tasks")
        .where("name", "==", task.name)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            firebase.firestore().collection("/tasks").doc(doc.id).set(task);
          });
        });
    },

    remove: function (task: Task) {
      firebase
        .firestore()
        .collection("/tasks")
        .where("name", "==", task.name)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            firebase.firestore().collection("/tasks").doc(doc.id).delete();
          });
        });
      this.tasks.splice(this.tasks.indexOf(task), 1);
    },
  },

  mounted: function () {
    const tasks: Task[] = [];
    firebase
      .firestore()
      .collection("/tasks")
      .get()
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.data() as Task;
          this.tasks.push(data);
        });
      });
  },
});
</script>