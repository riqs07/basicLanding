let express = require('express')
let app = express()
let bodyParser = require('body-parser')

app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))

// actually talking to my DB

var mysql = require('mysql');

     
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'wolvesCDQ49!',
  database : 'join_us'
});


connection.connect()


app.get("/",(req,res)=>{
    let sql = 'select count(*) as count from users;';

    connection.query(sql,(error, results, fields) =>{
        
        if (error) throw error;
        console.log(results[0].count);

        count = results[0].count

        res.render("home",{count:count})
      });
      


});

// Posting or sending info to express and then MySQL
// only triggered when post request sent to /register 
// currently only called on form submit 
app.post("/register",(req,res)=>{
    let sql = 'insert into users set ? ';
    let newSignup = {
        email:req.body.email,
      }


    connection.query(sql,newSignup,(error,results)=>{
        if (error) throw error;
       res.redirect('/')
        console.log('DB Updated')
    }) 


});


app.listen (8080, ()=>{
    console.log('Wassup, your server go Usain Bolt')
    
  });
  

