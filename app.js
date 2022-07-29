//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Welcome to the personal blog of Scott Sakurai. This is one of the first web applications I have made in my programming journey. I created this website in the hopes to learn about technologies such as HTML, CSS, JavaScript, MongoDB, etc. However, later in my coding journey, I have decided to actually use the blog and use it to log ideas and my progress on my professional and personal life. Hopefully if you are reading this, you are considering me for a position. If that is true, please email me @";
const aboutContent = "I am a Full-Stack Developer based in California. I am interested in both frontend and backend development. I am a hardworker and am eager to develop and master new skills everyday. I have developed many projects over the years, and with every project I learn more and more. While coding is a huge part of my life, when I have time to relax I love to watch movies with my friends or binge a new show before bed. While I love freelance development and coding small projects, I would love to branch out and work on large scale applications one day."
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// mongoose.connect("mongodb+srv://scottsak:February@cluster0.wld40.mongodb.net/?retryWrites=true&w=majority/blogDB", {useNewUrlParser: true});
mongoose.connect("'mongodb+srv://scottsak:Feb!2193803@cluster0.w3za4.mongodb.net/Blog", {useNewUrlParser: true});
// mongoose.connect("mongodb+srv://scottsak:Feb2193803!@cluster0.oppf4xh.mongodb.net/Blog", {useNewUrlParser: true});



const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
