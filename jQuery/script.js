console.log('== CONSOLE READY ==');

var todo = todo || {};
var data = JSON.parse(localStorage.getItem('todoData'));
data = data || {};

(function (todo, data, $) {
    var defaults = {
        todoTask: "todo-task",
        todoHeader: "todo-header",
        todoDate: "todo-date",
        todoDescription: "todo-description",
        taskId: "task-",
        formId: "todo-form",
        dataAttribute: "data",
        deleteDiv: "delete-div"
    };
    var codes = {
        "1": "#pending",
        "2": "#inProgress",
        "3": "#completed"
    };
})(todo, data, jQuery);