const { response } = require('express')
const express = require('express')

const app= express()

app.get('',(req,res)=>{
    res.send('hello express!')
})

app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})