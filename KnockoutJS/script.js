/**
 * ToDoList
 * @type {[*]}
 */

(function (ko, $) {
    var data = [
        {id: 1, title: "Drink beer", isDone: false},
        {id: 2, title: "Eat food", isDone: false},
        {id: 3, title: "Snowboard", isDone: false}
    ];

    function Task(data) {
        this.title = ko.observable(data.title);
        this.isDone = ko.observable(data.isDone);
        this.isEditing = ko.observable(data.isEditing);
    }

    function TaskListViewModel() {
        var $this = this;
        $this.tasks = ko.observableArray([]);
        $this.newTaskText = ko.observable();

        $this.incompleteTasks = ko.computed(function () {
            return ko.utils.arrayFilter($this.tasks(), function (task) {
                return !task.isDone() && !task._destroy;
            });
        });

        $this.completeTasks = ko.computed(function () {
            return ko.utils.arrayFilter($this.tasks(), function (task) {
                return task.isDone() && !task._destroy;
            });
        });

        $this.addTask = function () {
            $this.tasks.push(new Task({
                title: this.newTaskText(),
                isEditing: false
            }));
            $this.newTaskText("");
        };

        /**
         * @param task
         */
        $this.removeTask = function (task) {
            $this.tasks.destroy(task);
        };

        $this.removeCompleted = function () {
            $this.tasks.destroyAll($this.completeTasks());
        };

        /** Load the data **/
        var mappedTasks = $.map(data, function (item) {
            return new Task(item);
        });

        $this.tasks(mappedTasks);
    }

    ko.applyBindings(new TaskListViewModel());
})(ko, jQuery);