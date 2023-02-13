const express= require('express')
const mongoose= require('mongoose')
const cors=require('cors')

const app=express()

const router= require("./src/Route/ToDoRoute")

app.use(express.json())
app.use(cors());
app.use(router);

const uri='mongodb+srv://mangeshi:vDvH2p$XED2AWyr@cluster0.ohhpuda.mongodb.net/?retryWrites=true&w=majority'
async function connect(){
  try{
    await mongoose.connect(uri)
    console.log('connected to mongodb')
  }catch(err){
    console.log(err)
  }
}
connect()


app.listen(8000,()=>{console.log('server started on port 8000')})


