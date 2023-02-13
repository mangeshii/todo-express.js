const TodoModel= require("../models/ToDoModel");

module.exports.getToDo= async (req,res)=>{
  const allTodo= await TodoModel.find();
  res.send(allTodo);
}

module.exports.saveTodo= async (req,res)=>{
  const {todo} = req.body;
  TodoModel.create({ todo })
  .then(()=>res.set(201).send("Added Succesfully..."))
  .catch((err)=>console.log('error', err))
}

module.exports.deleteTodo= async (req,res)=>{
  const {_id}= req.body;
  TodoModel
  .findByIdAndDelete(_id)
  .then(()=>res.set(201).send("Deleted Succesfully..."))
  .catch((err)=>console.log(err))
}

module.exports.updateTodo= async (req,res)=>{
  const {_id,todo}= req.body;
  TodoModel
  .findByIdAndUpdate(_id,{todo})
  .then(()=>res.set(201).send("Updated Succesfully..."))
  .catch((err)=>console.log(err))
}