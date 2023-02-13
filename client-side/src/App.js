import { VscAdd } from "react-icons/vsc";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todo, setTodo] = useState("");
  const [alltodo, setAllTodo] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");

  const totalTask = alltodo.length;

  const makeAPICall = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-todo");
      setAllTodo(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddTodo = () => {
    if (isUpdating === "") {
      try {
        axios.post("http://localhost:5000/save-todo", { todo });
        setTodo(" ");
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        axios.post("http://localhost:5000/update-todo", {
          _id: isUpdating,
          todo,
        });
        setTodo(" ");
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleDeleteTodo = (id) => {
    try {
      axios.post("http://localhost:5000/delete-todo", { id });
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateTodo = (id, todo) => {
    setIsUpdating(id);
    setTodo(todo);
  };

  useEffect(() => {
    makeAPICall();
  });

  return (
    <div
      className="App flex justify-center text-white"
      style={{ backgroundColor: "#171717" }}
    >
      <div className="container max-w-screen-md  h-screen py-16 flex justify-center">
        <div
          className="todo-container w-3/5 py-5 rounded-lg "
          style={{ backgroundColor: "#212121" }}
        >
          <h1
            className="py-5 text-2xl"
            style={{ textAlign: "center", color: "#808080" }}
          >
            MY TODO'S
          </h1>
          <div className="add-todo flex justify-center">
            <div className="input-field relative ">
              <input
                type="text"
                className="border bg-transparent focus:outline-none  border-gray-400 w-96 p-3 border-x-0 border-t-0 border-b "
                onChange={(e) => setTodo(e.target.value)}
                value={todo}
                placeholder="Add a Task"
                style={{ border: "1px solid #2f2f2f" }}
              />
              <VscAdd
                className="bg-pink-500 text-2xl p-1 rounded-md  absolute top-3 right-2"
                onClick={handleAddTodo}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-center mt-7 mb-2">
              <h2
                className="w-96 text-start pl-2"
                style={{ color: "#808080" }}
              >{`Tasks - ${totalTask}`}</h2>
            </div>
            {alltodo &&
              alltodo.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="add-todo flex w-full justify-center items-center flex-col "
                  >
                    <div
                      className="input-field relative py-2 m-1 rounded-lg w-96 flex  justify-center items-center"
                      style={{ backgroundColor: "#2f2f2f" }}
                    >
                      <div className="w-full flex">
                        <input
                          type="checkbox"
                          className="mx-3 accent-pink-500 checkbox-checked"
                        />
                        <h1 className="w-96 opacity-100 text-white todo-item">
                          {item.todo}
                        </h1>
                      </div>
                      <div className="flex absolute top-2 right-2 btn-container">
                        <CiEdit
                          className="text-xl mr-2 edit-btn"
                          style={{ color: "#E75480" }}
                          onClick={() => handleUpdateTodo(item._id, item.todo)}
                        />
                        <RiDeleteBin6Line
                          className="text-xl delete-btn"
                          style={{ color: "#E75480" }}
                          onClick={() => handleDeleteTodo(item._id)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
