const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const conn = require("./database/Database");
const Question = require("./database/Ask");
const Answer = require("./database/Answer");



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
app.get("/project/asksomething", (req,res) =>{
    
    Question.findAll({raw: true, order:[
        ['id','DESC']
    ]}).then(questions => {
        res.render("index", {
            questions: questions
        });
    })
    

});

app.get("/project/asksomething/question",(req,res) => {
    res.render("ask.ejs");
});

app.get("/project/asksomething/question/:id",(req,res) => {
    const id = req.params.id;
    Question.findOne({
        where: {id: id}
    }).then(question => {
        if(question != undefined){
            Answer.findAll({
                where: {questionId: question.id},
                order: [
                    ['id', 'DESC']
            ]}).then(answers => {
                res.render("question.ejs",{
                    question: question,
                    answers: answers
                });
            })
        }else{
            res.redirect("/project/asksomething");
        }
    }); 
});

app.post("/project/asksomething/savequestion",(req,res) => {
    const title = req.body.title;
    const description = req.body.description;
    Question.create({
        title: title,
        description: description
    }).then(() => {
        res.redirect("/");
    });
});

app.post("/project/asksomething/answer", (req, res) => {
    const body = req.body.body;
    const questionId = req.body.question;
    Answer.create({
        body: body,
        questionId: questionId
    }).then(() => {
        res.redirect("/project/asksomething/question/"+questionId);
    });
})

app.listen(8080,()=>{
    console.log("App working!");
});