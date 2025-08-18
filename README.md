
# React UI Components Assessment

This project is a **React component development assignment** built with **TypeScript** and **TailwindCSS**. It includes two main reusable components: `InputField` and `DataTable`, documented with **Storybook**.

---

## 🎯 Project Goal

* Build reusable UI components with proper typing, responsive design, and accessibility.
* Demonstrate features like validation, sorting, row selection, and theme toggling.
* Prepare components for scalability and documentation.

---

## 🛠 Tech Stack

* **React** (Functional Components & Hooks)
* **TypeScript** (Strict typing for props and state)
* **TailwindCSS** (Modern, responsive styling)
* **Storybook** (Component documentation & interactive demo)

---

## 📦 Components Overview

### 1️⃣ InputField

* Props: `value`, `onChange`, `label`, `placeholder`, `helperText`, `errorMessage`, `disabled`, `invalid`, `variant`, `size`, `clearable`, `type`
* Variants: `outlined`, `filled`, `ghost`
* Sizes: `sm`, `md`, `lg`
* Features:

  * Clearable input
  * Password toggle
  * Validation states
  * Light/Dark theme support

### 2️⃣ DataTable

* Props: `data`, `columns`, `loading`, `selectable`, `onRowSelect`
* Features:

  * Column sorting
  * Single/multiple row selection
  * Loading & empty states
  * Responsive design
  * Light/Dark theme support

---

## 🌗 Light/Dark Theme

* Toggle available in the demo app.
* Components automatically update background, text, and input colors.

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<username>/<repo-name>.git
cd <repo-name>
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### 4️⃣ Run Storybook

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to view the component documentation and interactive demos.

---

## 📌 GitHub Push Commands

```bash
git add .
git commit -m "Initial commit - React UI Components Assessment"
git branch -M main
git remote add origin https://github.com/<username>/<repo-name>.git
git push -u origin main
```

Replace `<username>` and `<repo-name>` with your GitHub username and repository name.

---

## 📚 Learn More

* [React documentation](https://reactjs.org/)
* [TypeScript documentation](https://www.typescriptlang.org/)
* [TailwindCSS documentation](https://tailwindcss.com/docs)
* [Storybook documentation](https://storybook.js.org/docs/react/get-started/introduction)

