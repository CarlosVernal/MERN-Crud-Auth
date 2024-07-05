import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  const allTasks = await Task.find({
    user: req.user.id,
  }).populate('user',"username");
  res.json(allTasks);
};

export const getTask = async (req, res) => {
  const taskFind = await Task.findById(req.params.id).populate("user","username");
  if (!taskFind) return res.status(404).json({ message: "Task not found" });
  res.json(taskFind);
};

export const deleteTask = async (req, res) => {
  const dropTask = await Task.findByIdAndDelete(req.params.id);
  if (!dropTask) return res.status(404).json({ message: "Task not found" });
  res.json(dropTask);
};

export const createTask = async (req, res) => {
  const { title, description, date } = req.body;
  const newTask = new Task({
    title,
    description,
    date,
    user: req.user.id,
  });
  const savedTask = await newTask.save();
  res.json(savedTask);
};

export const updateTask = async (req, res) => {
  const upTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); //new:true para que el dato que guarde en la variable upTask sea el actualizado o nuevo y no el antiguo que es por defecto
  if (!upTask) return res.status(404).json({ message: "Task not found" });
  res.json(upTask);
};
