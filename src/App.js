import { useEffect, useState } from 'react';
import './App.css';
import Users from "./User/Users";

const API_URL = "http://localhost:8000/api/users";

function App() {

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    setUsers(data.data);
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  return <>
    <div className="Users">
      <Users allUsers={users} />
    </div>
  </>
}

export default App;
