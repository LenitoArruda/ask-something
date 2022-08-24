const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const conn = require("./database/Database");
const Question = require("./database/Ask");

//Database
conn.authenticate()
.then(() => {
    console.log("Successful connection!")
})
.catch((msgErro) => {
    console.log(msgErro);
})
;

//Telling to Express use EJS as View Engine
app.set('view engine','ejs');
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes
app.get("/", (req,res) =>{
    
    Question.findAll({raw: true, order:[
        ['id','DESC']
    ]}).then(questions => {
        res.render("index", {
            questions: questions
        });
    })
    

});

app.get("/ask",(req,res) => {
    res.render("ask.ejs");
});

app.post("/savequestion",(req,res) => {
    const title = req.body.title;
    const description = req.body.description;
    Question.create({
        title: title,
        description: description
    }).then(() => {
        res.redirect("/");
    });
});

app.listen(8080,()=>{
    console.log("App working!");
});