//jshint esversion:6
import'dotenv/config';
import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { log } from 'console';
import md5 from 'md5';
import bcrypt from 'bcrypt';

const saltRounds = 10;



const app = express()
const port = 3000;



app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

// getting-started.js




main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/userDB');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

  const userSchema = new mongoose.Schema ({
    email: String,
    password: String
  })

  

 



  const User = mongoose.model("User",userSchema);





  app.get("/", function(req,res){
    res.render("home")
})

app.get("/login", function(req,res){
    res.render("login")
})

app.get("/register", function(req,res){
    res.render("register");
})




app.post("/register", function(req,res){
    
    bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
       
        const newUser = new User({
            email: req.body.username,
            password: hash
        })
    
        await newUser.save(res.render("secrets"));
    });
    
    
    
    
})

app.post("/login", async function(req,res){

    const username = req.body.username;
    const password = req.body.password;
    

    User.findOne({email: username})
    .then(results => {
        if(results){
            bcrypt.compare(password, results.password, function(err, result) {
                // result == true
                if(result === true){
                    res.render("secrets");
                }
                
            });
                
            

        }
    })

})

}









app.listen(port, function(){
    console.log("Server started on port 3000. ");
})