// CRUD REST API WITH VALIDATION

const express =require('express')
const Joi = require('joi')
const port = process.env.PORT || 8080
const app = express()

const message404 = "<h1><strong>Programming language not found !</strong><h1>"
app.use(express.json())

const languages = [
    {id : 1 , name : "c++"},
    {id : 2 , name : "Java"},
    {id : 3 , name : "Ruby"},
    {id : 4 , name : "Kotlin"},
] 



// READ ALL THE PROGRAMMING LANGUAGES
app.get('/api/languages', (req,res)=>{
        res.send(languages)
})

// READ ONE PROGRAMMING LANGUAGE
app.get('/api/languages/:id', (req, res)=>{
    const language = languages.find(lang => lang.id === req.params.id * 1)
    if (!language) return res.status(404).send(message404)
    res.send(language)
})

// CREATE A NEW PROGRAMMING LANGUAGE
app.post('/api/languages', (req ,res)=>{
    const schema = Joi.object({
        name : Joi.string().min(1).required()
    })
    const {error} = schema.validate(req.body)
    if (error) return res.status(400).send(`<h1><strong>${error.details[0].message}</strong><h1>`)

    const language ={
        id : languages.length + 1,
        name : req.body.name
    }
    languages.push(language)
    res.json({success : "success" , language})
    
})

//UPDATING AN EXSISTING PROGRAMMING LANGUAGE
app.put('/api/languages/:id' ,(req, res)=>{
    const language = languages.find(lang => lang.id === parseInt(req.params.id))
    if (!language) return res.status(404).send(message404)

    const schema = Joi.object({
        name : Joi.string().min(1).required()
    })
    const {error} = schema.validate(req.body)
    if (error) return res.status(400).send(`<h1><strong>${error.details[0].message}</strong><h1>`)

    language.name = req.body.name
    res.json({success : "successufuly updated" , language})
})

// DELETE AN EXSISTING PROGRAMMING LANGUAGE

app.delete('/api/languages/:id' ,(req,res)=>{
    const language = languages.find(lang => lang.id === parseInt(req.params.id))
    if (!language) return res.status(404).send(message404)

    const languageIndex = languages.indexOf(language)
    languages.splice(languageIndex , 1)

    res.json({success :"successufuly deleted" , language })
})

app.listen(port)