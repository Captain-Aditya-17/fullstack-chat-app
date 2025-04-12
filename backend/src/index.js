const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.route');
const messageRoutes = require('./routes/message.route');
const connectToDb = require('./db/db');
const cookieParser = require('cookie-parser');
const { io, server,app } = require('./lib/socket');
const path = require('path');
dotenv.config();
connectToDb();



app.use(cookieParser())
app.use(express.json({ limit: '10mb' })) 
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,  
}))

const __dirname = path.resolve()

app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, '../frontend/dist')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'))
    })
}
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})