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

    var getDate = function (date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var fullDate = month + "/" + day + "/" + year;

        return fullDate;
    };

    var saveToStorage = function (params) {
        localStorage.setItem("todoData", JSON.stringify(params));
    };

    var generateElement = function (params) {
        var parent = $(codes[params.code]), wrapper;
        if (!parent) { return; }

        wrapper = $("<div />", {
            "class": defaults.todoTask,
            "id": defaults.taskId + params.id,
            "data": params.id
        }).appendTo(parent);

        $("<div />", {
            "class": defaults.todoHeader,
            "text": params.title
        }).appendTo(wrapper);

        $("<div />", {
            "class": defaults.todoDate,
            "text": params.date
        }).appendTo(wrapper);

        $("<div />", {
            "class": defaults.todoDescription,
            "text": params.description
        }).appendTo(wrapper);

        wrapper.draggable({
            start: function () {
                $("#" + defaults.deleteDiv).show();
            },
            stop: function () {
                $("#" + defaults.deleteDiv).hide();
            }
        });
    };

    var removeElement = function (params) {
        $("#" + defaults.taskId + params.id).remove();
    };

    todo.init = function (options) {
        options = options || {};
        options = $.extend({}, defaults, options);

        $.each(data, function (index, params) {
            generateElement(params);
        });

        $.each(codes, function (index, value) {
            $(value).droppable({
                drop: function (event, ui) {
                    var element = ui.helper,
                        css_id = element.attr("id"),
                        id = css_id.replace(options.taskId, ""),
                        object = data[id];

                    removeElement(object);

                    object.code = index;

                    generateElement(object);

                    data[id] = object;

                    saveToStorage(data);

                    $("#" + defaults.deleteDiv).hide();
                }
            })
        });

        $("#" + options.deleteDiv).droppable({
            drop: function (event, ui) {
                var element = ui.helper,
                    css_id = element.attr("id"),
                    id = css_id.replace(options.taskId, ""),
                    object = data[id];

                removeElement(object);

                delete data[id];
                saveToStorage(data);

                $("#" + defaults.deleteDiv).hide();
            }
        });
    };

    todo.add = function () {
        var inputs = $("#" + defaults.formId + " :input"),
            errMsg = "Title can not empty",
            id, title, description, date, tempData;

        if (inputs.length !== 4) { return; }

        title = inputs[0].value;
        description = inputs[1].value;
        date = inputs[2].value;

        if (!title) {
            alert(errMsg);
            return;
        }

        id = new Date().getTime();

        tempData = {
            id: id,
            code: "1",
            title: title,
            date: date,
            description: description
        };

        data[id] = tempData;
        saveToStorage(data);

        generateElement(tempData);

        inputs[0].value = "";
        inputs[1].value = "";
        inputs[2].value = "";
    };

    todo.clear = function () {
        data = {};
        saveToStorage(data);
        $("." + defaults.todoTask).remove();
    };

})(todo, data, jQuery);