import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getTodo = async () => {
    if (!token) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/getAllTodo`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setTodo(data.allTodo || []);
      } else {
        setError(data.message || "Failed to fetch todos");
      }
    } catch (error) {
      console.error("Error fetching todo data:", error);
      setError(error.response?.data?.message || "Failed to fetch todos");
      
      // If token is invalid, clear it
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setToken(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await axios.delete(
        backendUrl + `/api/user/delete-todo/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      if (data.success) {
        setTodo(prev => prev.filter((t) => t._id !== id));
      } else {
        setError(data.message || "Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      setError(error.response?.data?.message || "Failed to delete todo");
      
      // If token is invalid, clear it
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setToken(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Please enter a todo title");
      return;
    }
    
    if (!token) {
      setError("Please login to add todos");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/add-todo", // Fixed: lowercase 't'
        {
          title: text.trim(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      if (data.success) {
        setTodo((prev) => [...prev, data.todo]);
        setText("");
      } else {
        setError(data.message || "Failed to add todo");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
      setError(error.response?.data?.message || "Failed to add todo");
      
      // If token is invalid, clear it
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setToken(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (id, currentStatus) => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await axios.patch(
        backendUrl + `/api/user/change-status/${id}`,
        {
          completed: !currentStatus,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      if (data.success) {
        setTodo(prev =>
          prev.map((t) =>
            t._id === id ? { ...t, completed: !currentStatus } : t
          )
        );
      } else {
        setError(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating todo status:", error);
      setError(error.response?.data?.message || "Failed to update status");
      
      // If token is invalid, clear it
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setToken(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id, newText) => {
    if (!id || !newText?.trim()) {
      setError("Please enter a valid todo title");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await axios.put(
        backendUrl + `/api/user/updateTodo/${id}`,
        {
          title: newText.trim(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setTodo((prev) => prev.map((t) => (t._id === id ? data.todoData : t)));
      } else {
        setError(data.message || "Failed to update todo");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      setError(error.response?.data?.message || "Failed to update todo");
      
      // If token is invalid, clear it
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setToken(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getTodo();
    } else {
      setTodo([]);
      setError(null);
    }
  }, [token]);

  // Clear error when user starts typing
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const value = {
    token,
    setToken,
    backendUrl,
    getTodo,
    todo,
    setTodo,
    deleteTodo,
    addTodo,
    changeStatus,
    updateTodo,
    setText,
    text,
    loading,
    error,
    setError,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
