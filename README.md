# 📝 Personal Task Tracker

A simple and elegant **React Native** app to manage personal tasks efficiently. Built using **TypeScript**, **React Navigation**, and **context-based state management**. It supports adding, editing, and toggling tasks with persistent local storage.

---

## 📱 Features

- ✅ Add, edit, and toggle tasks
- 📅 Prioritize tasks with custom labels
- 🔒 Local storage support with async persistence
- 📂 Modular architecture for scalability
- 💡 Error handling, Clean and reusable UI components

---

## 📁 Project Structure

```
PersonalTaskTracker/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx 
│   │   │   ├── Input.tsx 
│   │   │   └── LoadingSpinner.tsx 
│   │   ├── TaskItem.tsx 
│   │   ├── TaskForm.tsx 
│   │   └── TaskList.tsx 
│   ├── screens/
│   │   ├── HomeScreen.tsx 
│   │   ├── AddTaskScreen.tsx 
│   │   └── EditTaskScreen.tsx
│   ├── services/
│   │   └── taskStorage.ts 
│   ├── context/
│   │   └── TaskContext.tsx
│   ├── utils/
│   │   ├── constants.ts 
│   │   └── helpers.ts 
│   └── navigation/
│       └── AppNavigator.tsx
├── app/_layout.ts 
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- A mobile device/emulator

### Installation

```bash
git clone https://github.com/mohammed-ahsan/PersonalTaskTracker.git
cd PersonalTaskTracker
npm install
```

### Running the App

```bash
npx expo start
```

Scan the QR code using the **Expo Go** app on your mobile device or run it on an emulator.

---

## 🛠️ Built With

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)


---

## 👤 Author

**Mohammad Sadi**  
[Your GitHub](https://github.com/mohammed-ahsan) · [Your LinkedIn](https://www.linkedin.com/in/mohammed-a-883756b3/)

---

## 🎥 Demo Video

[![Watch the demo](https://img.youtube.com/vi/JSguWHYlVdY/0.jpg)](https://www.youtube.com/watch?v=JSguWHYlVdY)




