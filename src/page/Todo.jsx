import React, { useState } from "react";
import axios from "axios";

import Login from "./Login.jsx";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

const Todo = () => {
  const {
    token,
    todo,
    deleteTodo,
    addTodo,
    changeStatus,
    updateTodo,
    text,
    setText,
  } = useContext(AppContext);

  return (
    <div>
      {token ? (
        <div className=" gap-4 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center p-8">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-8 shadow-md px-6 py-3 bg-white rounded-2xl">
            📝 TODO - APPLICATION
          </h1>

          {/* Input Section */}
          <div className="flex items-center gap-3 mb-8 bg-white shadow-md rounded-xl px-4 py-3 w-full max-w-md">
            <form onSubmit={addTodo}>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                placeholder="Enter your task..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition-all"
              >
                Add
              </button>
            </form>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 font-semibold text-gray-700 bg-white p-3 rounded-lg shadow mb-2 w-full max-w-3xl text-center">
            <p>Title</p>
            <p>Date</p>
            <p>Status</p>
            <p>Action</p>
            <p>Action</p>
          </div>

          {/* Todo List */}
          <div className="w-full max-w-3xl bg-white rounded-lg shadow divide-y divide-gray-200">
            {todo.length > 0 ? (
              todo
                .slice()
                .reverse()
                .map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 gap-4 p-3 text-center items-center hover:bg-gray-50 transition-all"
                  >
                    <p
                      className={`text-gray-800 font-medium ${
                        item.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>

                    <input
                      type="checkbox"
                      checked={item.completed} // shows current status
                      onChange={() => changeStatus(item._id, item.completed)} // toggles status
                      className="w-4 h-4 mx-auto"
                    />

                    <button
                      onClick={() => deleteTodo(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-all"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => {
                        const newTitle = prompt("Enter new title:", item.title);
                        if (newTitle && newTitle.trim() !== "") {
                          updateTodo(item._id, newTitle.trim());
                        }
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition-all"
                    >
                      Update
                    </button>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-500 py-4">No todos yet 😴</p>
            )}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Todo;
