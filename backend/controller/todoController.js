const Todo = require('../models/todoModel');

exports.todoAdd = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'All fields are required!', success: false });
    }

    const newTodo = await Todo.create({
      title,
      description,
      userId: req.user.id,
    });

    return res.status(201).json({
      message: 'Todo created successfully!',
      success: true,
      newTodo,
    });

  } catch (error) {
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};


// todo find by id 

exports.todoFindById = async (req, res) => {

  const { id } = req.params
  try {

    if (!id) {
      return res.status(401).json({ message: 'Id is not Provided !', success: false })
    }

    const todo = await Todo.findById(id);

    if(!todo){

      return res.status(401).json({ message: 'Todo not found !', success: false })
    }

    return res.status(200).json({
      message: 'Todo fetched successfully !',
      success: true,
      todo
    })


  } catch (error) {
    res.status(500).json({ message: 'Internal server error', success: false });

  }
}



exports.allTodo = async (req, res) => {
  try {
    const allTodo = await Todo.find().populate({
        path: 'userId',
        select: '-password' 
      }).sort({ createdAt: -1 });
    return res.status(200).json({
      message: 'Fetched all todos successfully',
      success: true,
      allTodo,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

// Specific user's todos
exports.usersTodo = async (req, res) => {
  try {
    const usersTodo = await Todo.find({ userId: req.user.id });
    return res.status(200).json({
      message: 'Fetched users todos successfully',
      success: true,
      usersTodo,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};


// update todo

exports.editTodo = async (req, res) => {

  const todoId = req.params.id;

  try {
    if (!todoId) {
      return res.status(400).json({ message: 'ID not provided!', success: false });
    }

    const updatetodo = await Todo.findByIdAndUpdate(todoId, req.body, { new: true })


    if (!updatetodo) {
      return res.status(404).json({ message: 'Todo not found!', success: false });
    }

    return res.status(200).json({
      message: 'Todo updated successfully',
      success: true,
      updatetodo,
    });

  } catch (error) {
    res.status(500).json({ message: 'Internal server error', success: false });

  }
}


exports.deleteTodo = async (req, res) => {
  const todoId = req.params.id;

  try {
    if (!todoId) {
      return res.status(400).json({ message: 'ID not provided!', success: false });
    }

    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found!', success: false });
    }

    return res.status(200).json({
      message: 'Todo deleted successfully',
      success: true,
      deletedTodo,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};
