import React, { useState, useContext } from "react";
import Login from "./Login.jsx";
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center p-4 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-6 sm:mb-8 shadow-md px-4 sm:px-6 py-2 sm:py-3 bg-white rounded-2xl text-center">
            📝 TODO - APPLICATION
          </h1>

          {/* Input Section */}
          <form
            onSubmit={addTodo}
            className="flex flex-col sm:flex-row items-center gap-3 mb-8 bg-white shadow-md rounded-xl px-4 py-4 w-full max-w-md"
          >
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              placeholder="Enter your task..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto px-5 py-2 rounded-lg font-semibold transition-all"
            >
              Add
            </button>
          </form>

          {/* Todo List */}
          <div className="w-full max-w-3xl bg-white rounded-lg shadow divide-y divide-gray-200">
            {todo.length > 0 ? (
              todo
                .slice()
                .reverse()
                .map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-4 p-4 text-center sm:text-left items-center hover:bg-gray-50 transition-all"
                  >
                    {/* Title */}
                    <p
                      className={`text-gray-800 font-medium break-words ${
                        item.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {item.title}
                    </p>

                    {/* Date */}
                    <p className="text-gray-500 text-sm">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>

                    {/* Checkbox */}
                    <div className="flex justify-center sm:justify-start">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() =>
                          changeStatus(item._id, item.completed)
                        }
                        className="w-5 h-5 accent-blue-600"
                      />
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteTodo(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-all w-full sm:w-auto"
                    >
                      Delete
                    </button>

                    {/* Update Button */}
                    <button
                      onClick={() => {
                        const newTitle = prompt("Enter new title:", item.title);
                        if (newTitle && newTitle.trim() !== "") {
                          updateTodo(item._id, newTitle.trim());
                        }
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium transition-all w-full sm:w-auto"
                    >
                      Update
                    </button>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-500 py-6">
                No todos yet 😴
              </p>
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
