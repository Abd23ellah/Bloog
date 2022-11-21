 const express=require("express");
 const bodyParser=require("body-parser");
 

 
 // Load the full build.
var _ = require('lodash');

 const app=express();
 
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

const lorem="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
let posts=[];

app.get("/",function(req,res){
    res.render("index",{ipsum:lorem,posts:posts});
    
})

app.get("/about",function(req,res){
  res.render("about" ,{ipsum:lorem})
})

app.get("/contacts",function(req,res){
  res.render("contacts" ,{ipsum:lorem})
})

app.get("/compose" ,function(req,res){
  
  res.render("compose")
  
})


app.get("/posts/:postName",function(req,res){
  const paramsID=_.lowerCase(req.params.postName) ;
  
  posts.forEach(function(post){
    const postTitle=_.lowerCase(post.title);
    if(postTitle===paramsID){
      res.render("post",{
        title:post.title,
        content:post.postBody,
        
      });

    }
    
  });
});




app.post("/compose" ,function(req,res){
  const post={
   title: req.body.title,
   postBody: req.body.postt
  }
  posts.push(post)
  res.redirect("/")
})


app.listen(3000,function(){
    console.log("the server is running on port 3000 !")
})

