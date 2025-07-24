const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDb = require('./config/db.js');
const errorMiddleware = require('./middleware/errorMiddleware.js');
const userRoutes = require('./routes/userRoute.js');
const todoRoutes = require('./routes/todoRoute.js')
const app = express();

app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true,
}));
app.use(errorMiddleware)
const PORT = process.env.PORT || 5000;


app.get('/',(req,res)=>{
    res.send('hello world');
});

// user routes
app.use('/api' ,userRoutes);

// todo routes
app.use('/todo' , todoRoutes)



app.listen(PORT, async () => {
    try {
        await connectDb();
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1); 
    }
});


// const express = require('express');

// const app = express();


// app.listen(3000,()=>{
//     console.log(
//         'server run at : 3000'
//     );
// });