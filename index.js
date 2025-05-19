import express from 'express';
import mongoose from 'mongoose';

const PORT = 3000;

const connectionString = "mongodb+srv://nilsterentjevs:Dammesiela245@cluster0.c7wustu.mongodb.net/TODOList?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(connectionString)
.then(() => console.log("Connected to DB"))
.catch(() => console.log("Got an err"));


const app = express();


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Todo List Home Page");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})