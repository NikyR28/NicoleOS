import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import './styles/main.css'
import './App.css'
import './styles/variables.css'
import { useEffect, useState } from "react";
import { getBooksSupabase } from "./supabaseClient";
function App() {
  const [activeTab, setActiveTab]=useState('ALL');
  const [books, setBooks]=useState([]);

  useEffect((()=>{
    const fetchBooks = async () => {
      const data = await getBooksSupabase();
      setBooks(data);
    };
    fetchBooks();
  }),[]);

  return (
        <div className="App">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          ></Sidebar>
          <main className="content-area">
            <Header></Header>
            {/*poi in book grid passerò books ottenuti*/} 
          </main>
        </div>
  );
}

export default App;