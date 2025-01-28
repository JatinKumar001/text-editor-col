# Collaborative Text Editor  

A real-time collaborative text editor built with **React**, **TypeScript**, and **TipTap**, featuring text formatting options, real-time conflict handling with **Liveblocks**, and a customizable toolbar.

---

## 🚀 Features  

- Real-time collaboration and conflict handling  
- Rich text formatting (headings, bold, lists, alignment, colors, highlights)  
- Responsive toolbar with interactive dropdowns
- Clean UI with Tailwind CSS  

---

## 🛠️ Tech Stack  

- **Frontend:** React, TypeScript, TipTap  
- **Styling:** Tailwind CSS  
- **Real-time Collaboration:** Liveblocks  
- **Build Tool:** Vite  

---

## 🏗️ Getting Started  

Follow these steps to run the project locally:  

### 1. Clone the repository  
```bash
git clone https://github.com/JatinKumar001/text-editor-col.git  
cd text-editor-col  
```

### 2. Install dependencies 
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

### 4. Open in your browser
Visit [http://localhost:5173](http://localhost:5173) to see the application in action.

## 📁 Project Structure
- **src/App.tsx**: Root component initializing the editor environment
- **src/components/Editor.tsx**: Handles editor instance and text editing logic
- **src/components/Toolbar.tsx**: Provides UI for text formatting options
- **src/components/Navbar.tsx**: Provides swhiching between Documents
