const {Router} = require("express")
const router= Router();

const {getToDo,saveTodo,deleteTodo,updateTodo} = require("../Controllers/controller")

router.get("/get-todo", getToDo);
router.post("/save-todo", saveTodo);
router.post("/delete-todo", deleteTodo);
router.post("/update-todo", updateTodo);

module.exports= router;


