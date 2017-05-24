/**
 * ToDoList
 */

(function (ko) {
    /**
     * @param task
     * @param rawDate
     */
    function todoTask(task, rawDate) {
        var $this = this;
        $this.task = task;
        $this.rawDate = rawDate;
        $this.completion = ko.observable(false);
        $this.completeContent = ko.observable("&nbsp;");

        /**
         * completeTask
         */
        $this.completeTask = function () {
            if ($this.completion() == false) {
                $this.completion(true);
                $this.completeContent("&empty;");
            } else {
                $this.completion(false);
                $this.completeContent("&nbsp;");
            }
        };

        /**
         * set Date
         */
        $this.date = ko.computed(function () {
            var day = rawDate.getDate();
            var month = rawDate.getMonth() + 1;
            var year = rawDate.getFullYear();
            var date = month + "/" + day + "/" + year;

            return date;
        });
    }

    /**
     * taskViewModel
     */
    function taskViewModel() {
        var $this = this;
        $this.tasks = ko.observableArray([
            new todoTask("Buy Colgate", new Date()),
            new todoTask("Buy Milk", new Date())
        ]);

        $this.newTask = ko.observable("");

        /**
         * addTask
         */
        $this.addTask = function () {
            $this.tasks.push(new todoTask($this.newTask(), new Date()));
            $this.newTask("");
        };

        /**
         * removeTask
         */
        $this.removeTask = function () {
            $this.tasks.remove(this);
        };

        /**
         * completedTask
         */
        $this.completedTask = ko.computed(function () {
            var total = 0;
            for (var i = 0; i < $this.tasks().length; i++) {
                if ($this.tasks()[i].completion() == false) {
                    total++;
                }
            }

            return total;
        });
    }

    ko.applyBindings(new taskViewModel());
})(ko);