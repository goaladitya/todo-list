const RESPONSE_DONE=4;
const STATUS_OK=200;
window.onload=getTodoAJAX();

function active_todo(id){
    var xhr=new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id,true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    xhr.onreadystatechange= function(){
        if(xhr.readyState== RESPONSE_DONE){
            if(xhr.status==STATUS_OK){
                getTodoAJAX();
            }
            else{
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data="todo_title=ACTIVE");
}

function complete_todo(id){
    var xhr=new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id,true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    xhr.onreadystatechange= function(){
        if(xhr.readyState== RESPONSE_DONE){
            if(xhr.status==STATUS_OK){
                getTodoAJAX();
            }
            else{
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data="todo_title=COMPLETE");
}
function delete_todo(id){
    var xhr=new XMLHttpRequest();
    xhr.open("DELETE","/api/todos/"+id,true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    xhr.onreadystatechange= function(){
        if(xhr.readyState== RESPONSE_DONE){
            if(xhr.status==STATUS_OK){
                getTodoAJAX();
            }
            else{
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
}
function createTodoElement(id,todo_object){
    var todo_element=document.createElement("div");
    var todo_element_t1=document.createElement("text");
    var todo_element_b1=document.createElement("button");
    var todo_element_b2=document.createElement("button");

    if(todo_object.status!="DELETED") {
        var x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");
        if(todo_object.status=="COMPLETE") {
            x.setAttribute("checked", "TRUE");
            x.setAttribute("onchange", "active_todo("+id+")");
        }
        if(todo_object.status=="ACTIVE") {
            //x.setAttribute("checked", "FALSE");
            x.setAttribute("onchange", "complete_todo("+id+")");
        }

        todo_element.appendChild(x);
    }
    todo_element_t1.innerText=todo_object.title;
    todo_element_t1.setAttribute("data_id",id);
    todo_element_t1.setAttribute("class","todoStatus"+todo_object.status);
    todo_element.appendChild(todo_element_t1);

    if(todo_object.status!="DELETED")
    {
        todo_element_b2.innerText="DELETE";
        todo_element_b2.setAttribute("onclick","delete_todo("+ id+")");
        todo_element_b2.setAttribute("class","delete_todo_css");
        todo_element.appendChild(todo_element_b2);
    }
    return todo_element;
}
function addTodoElements(at_id,ct_id,dt_id,todos_data_json)
{
    var todos=JSON.parse(todos_data_json);
    var at_parent=document.getElementById(at_id);
    var ct_parent=document.getElementById(ct_id);
    var dt_parent=document.getElementById(dt_id);

    if(at_parent && ct_parent && dt_parent){
        at_parent.innerText="";
        ct_parent.innerText="";
        dt_parent.innerText="";

        Object.keys(todos).forEach(
            function(key){
                var todo_element=createTodoElement(key,todos[key]);
                if(todos[key].status=="ACTIVE")
                    at_parent.appendChild(todo_element);
                if(todos[key].status=="COMPLETE")
                    ct_parent.appendChild(todo_element);
                if(todos[key].status=="DELETED")
                    dt_parent.appendChild(todo_element);
            }
        )
    }

}


function getTodoAJAX()
{
    var xhr=new XMLHttpRequest();
    xhr.open("GET","/api/todos",true);
    xhr.onreadystatechange=function(){
        //code tht will be excuted after res HAS responsce recieved
        if(xhr.readyState==RESPONSE_DONE){
            if(xhr.status==STATUS_OK){
                //console.log(xhr.responseText);
                addTodoElements("active_todo_list_div","completed_todo_list_div","deleted_todo_list_div",xhr.responseText);
            }
        }
    }//callback end
    xhr.send(data=null);
}

function addTodoAJAX(){
    var title=document.getElementById("new_todo_input").value;
    var xhr=new XMLHttpRequest();
    console.log(title);

    xhr.open("POST","/api/todos",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var body_data="todo_title="+encodeURI(title);

    xhr.onreadystatechange=function(){
        if(xhr.readyState==RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                //getTodoAJAX();
                addTodoElements("active_todo_list_div","completed_todo_list_div","deleted_todo_list_div",xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(body_data);
}
