const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const PORT=process.env.PORT || 3000;
const _ = require('lodash');
const mongoose=require('mongoose');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
require('dotenv').config();

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent = "Hac Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const contactContent = "Scelerisque Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
let posts=[];


// main().catch(err=>console.log(err.message));
// async function main(){
//     await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qq0y2qa.mongodb.net/blogDB`); 
//     console.log("DB Connected");
// }
// mongoose.connect('mongodb://127.0.0.1:27017/blogDB');
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qq0y2qa.mongodb.net/blogDB`); 
console.log(`${process.env.DB_USERNAME}`);
console.log(`${process.env.DB_PASSWORD}`);
const blogSchema=new mongoose.Schema({
    title:String,
    content:String
});

const Blog=mongoose.model('Blog', blogSchema);

app.get("/",  function(req, res){
    Blog.find({}).then(function(found){
        res.render("home", {homeStartingContent:homeStartingContent, posts:found});

    }).catch(err=>console.log(err.message));


    // res.render("home", {homeStartingContent:homeStartingContent, posts:posts});
});

app.get('/posts/:postId', function(req, res){
    Blog.findOne({_id:req.params.postId}).then(function(found){
        console.log(found);
        res.render("post", {postTitle:found.title, postContent:found.content});
    }).catch(function(err){
        console.log(err.message);
        res.redirect("/");
    });
});

app.post("/", function(req, res){
    Blog.create({title:req.body.postTitle, content:req.body.postContent});

    // const post={
    //     title:req.body.postTitle,
    //     content:req.body.postContent,
    //     postId:_.lowerCase(req.body.postTitle) 
    // }
    // posts.push(post);
    res.redirect("/");
});

app.get("/compose", function(req, res){
    res.render("compose");
});
app.get("/reset", function(req, res){
    posts=[];
    res.redirect("/");
});

app.get("/about", function(req, res){
    res.render("about", {aboutContent:aboutContent});
});

app.get("/contact", function(req, res){
    res.render("contact", {contactContent:contactContent});
});

app.listen(PORT, function(){
    console.log(`App listening to ${PORT}`);
});