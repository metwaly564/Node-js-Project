const express = require("express");
const mongoose = require("mongoose")
const app = express();
app.use(express.json());

const Article = require("./models/Article")
mongoose.connect("mongodb+srv://metwaly834:aNK3bngTJkkC4i8R@mycluster.e4hwenw.mongodb.net/")
.then((res)=>{
    console.log("Connected successfully")
})
.catch((error)=>{
    console.log("error with connecting the database", error)
})
app.get("/hello", (req, res) => {
  res.send("hello");
});
app.get("/FindSummation/:number1/:number2", (req, res) => {
  console.log(req.params);
  res.send(Number(req.params.number1) + Number(req.params.number2));
});
app.get("/FindSummation2", (req, res) => {
//   console.log(req.body)
//   console.log(req.query.age)
//   res.send(`Hello ${req.body.name} Age is ${req.query.age} `)
    //  res.sendFile(__dirname + "/number.html")
    let numbers = "";
  for (let i = 1; i <= 50; i++) {
    numbers += i + "-";
  }
        res.render("number.ejs",{
            name : req.body.name,
            age : req.query.age , 
            numbers : numbers    
        })
});
app.get("/Hi", (req, res) => {
  res.send("Hi");
});
app.get("/numbers", (req, res) => {
  let numbers = "";
  for (let i = 1; i <= 50; i++) {
    numbers += i + "-";
  }
  res.send(`${numbers}`);
});
app.put("/put", (req, res) => {
  res.send("put");
});

app.delete("/delete", (req, res) => {
  res.send("Delete");
});



//Articels Endpoints//
app.post("/articles", async(req,res)=>{
    const newArticle = new Article();
    const ArticTitle = req.body.ArticleTitle
    const ArticBody = req.body.ArticleBody
    // res.send(ArticTitle + " " + ArticBody)
    newArticle.title = ArticTitle;
    newArticle.body = ArticBody;
    newArticle.numberOfLikes = 4;
    await newArticle.save()

    res.json(newArticle)
})


app.get("/articles", async (req,res)=>{
     const Articles = await Article.find();
     console.log(Articles)
     res.json(Articles)
})
app.get("/articles/:articleId", async (req,res)=>{
    const id = req.params.articleId

    try {    
        const article = await Article.findById(id)
        res.json(article);
        return
    }
    catch (error) {
        console.log("error while getting this id ", id);
        res.send("error");
    }
})

app.delete ("/Articles/:articleId", async (req,res)=>{
    const id = req.params.articleId;
    
try {    
        const article = await Article.findByIdAndDelete(id)
        res.send("deleted ok")
    }
    catch (error) {
        console.log("error while Article of this id ", id);
        return res.json(error)
    }
})
app.listen(3000, () => {
  console.log("i'm Listening in port 3000");
});


//mongodb+srv://metwaly834:aNK3bngTJkkC4i8R@mycluster.e4hwenw.mongodb.net/  