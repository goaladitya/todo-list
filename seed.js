var statusENUMS={
    ACTIVE: "ACTIVE",
    COMPLETE:"COMPLETE",
    DELETED:"DELETED"
}

var todos= {
    1: {title: "learn javascript", status: statusENUMS.ACTIVE},
    2: {title: "Get tutorial", status: statusENUMS.ACTIVE},
    3: {title: "git", status: statusENUMS.ACTIVE}
}
var next_todo_id=4;

module.exports={
    statusENUMS: statusENUMS,
    todos:todos,
    next_todo_id: next_todo_id
}
