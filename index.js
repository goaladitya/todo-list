var express=require("express");
var app=express();


var todo_db=require("./seed.js");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
//console.log(todo_db);

app.use("/",express.static(__dirname+"/public"));

//get all todos
//return a json object


app.get("/api/todos",function(req,res){
    res.json(todo_db.todos);
});

//delete req
app.delete("/api/todos/:id",function(req,res){
   var del_id= req.params.id;
   var todo= todo_db.todos[del_id];
   //if todo dosent exists , sens appropriat responce
    if(!todo){
        res.status(400).json({err:"todo dosen't exists"});
    }
    else {
        todo.status= todo_db.statusENUMS.DELETED;
        res.json(todo_db.todos);
    }
});

//add a todo

app.post("/api/todos",function(req,res){
    var todo=req.body.todo_title;
    if(!todo || todo=="" || todo.trim=="") {
        res.send(400).json({error: "todo title cant be empty"});
    }
    else {
        var new_todo_object={
            title: req.body.todo_title,
            status: todo_db.statusENUMS.ACTIVE
        }
        todo_db.todos[todo_db.next_todo_id++]=new_todo_object;
        res.json(todo_db.todos);
    }

});

//
app.put("/api/todos/:id",function(req,res){
    var mod_id= req.params.id;
    var todo= todo_db.todos[mod_id];
    //if todo dosent exists , sens appropriat responce
    if(!todo){
        res.status(400).json({err:"todo dosen't exists"});
    }
    else {
        var todo_status=req.body.todo_title;
        if(todo_status && (todo_status==todo_db.statusENUMS.ACTIVE || todo_status==todo_db.statusENUMS.COMPLETE)){
            todo.status=todo_status;
        }
        res.json(todo_db.todos);
    }
});

app.listen(4000);

