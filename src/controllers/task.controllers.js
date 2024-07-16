import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({}).populate("user", "username");
    user: req.user.id, res.json(allTasks);
  } catch (error) {
    return res.status(500).json({ message: "Tasks not found" });
  }
};

export const getTask = async (req, res) => {
  try {
    const taskFind = await Task.findById(req.params.id).populate(
      "user",
      "username"
    );
    if (!taskFind) return res.status(404).json({ message: "Task not found" });
    res.json(taskFind);
  } catch (error) {
    return res.status(500).json({ message: "Task not found" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const dropTask = await Task.findByIdAndDelete(req.params.id);
    if (!dropTask) return res.status(404).json({ message: "Task not found" });
    res.json(dropTask);
  } catch (error) {
    return res.status(500).json({ message: "Task not found" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const upTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); //new:true para que el dato que guarde en la variable upTask sea el actualizado o nuevo y no el antiguo que es por defecto
    if (!upTask) return res.status(404).json({ message: "Task not found" });
    res.json(upTask);
  } catch {
    return res.status(500).json({ message: "Task not found" });
  }
};
