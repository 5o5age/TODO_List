import express from 'express';
import mongoose, { connect } from 'mongoose';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));


const PORT = 3000;

const connectionString = "mongodb+srv://nilsterentjevs:Dammesiela245@cluster0.c7wustu.mongodb.net/TODOList?retryWrites=true&w=majority&appName=Cluster0"


app.use(express.json());

const TodoSchema = new mongoose.Schema ({
    name: String,
    completed: Boolean
});

const Todo = mongoose.model("Todo", TodoSchema);

app.get("/", (req, res) => {
  res.send("Todo List Home Page");
});

app.get("/todos", async (req, res) => {
    const todos = await Todo.find({});
    res.json(todos);
});

app.post("/todos", async (req,res) => {
    const todo = await Todo.create(req.body)
    res.json(todo)
});

app.get("/todos/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
});

app.delete("/todos/:id", async (req,res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id)
  res.json(todo);
});

app.put("/todos/:id", async (req,res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
    res.json(todo);
});



function connectDB(url) {
    return mongoose.connect(url)
}

async function start() {
  try {
    await connectDB(connectionString)
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start()