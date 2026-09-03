import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import BookGrid from "./components/BookGrid";
import './styles/main.css';
import './App.css';
import './styles/variables.css';
import { useEffect, useState } from "react";
import { getBooksSupabase } from "./supabaseClient";
function App() {
  const [activeTab, setActiveTab]=useState('ALL');
  const [books, setBooks]=useState([]);

  useEffect(()=>{
    const fetchBooks = async () => {
      const data = await getBooksSupabase();
      setBooks(data);
    };
    fetchBooks();
  },[]);

  let filteredBooks=books;
  switch(activeTab){
    case 'READ':
      filteredBooks=books.filter((book)=>book.status=='READ');
      break;
    case 'OWNED':
      filteredBooks=books.filter((book)=>book.status=='OWNED');
      break;
    case 'WISHLIST':
      filteredBooks=books.filter((book)=>book.status=='WISHLIST');
      break;
    default:
      filteredBooks=books;
      break;
  }

  return (
        <div className="App">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          ></Sidebar>
          <main className="content-area">
            <Header></Header>
            <BookGrid
              books={filteredBooks}
              activeTab={activeTab}
            ></BookGrid>
          </main>
        </div>
  );
}

export default App;