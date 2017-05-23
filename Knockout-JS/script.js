console.log('== CONSOLE READY ==');

function todoTask(task, rawDate) {
    var $this = this;
    $this.task = task;
    $this.rawDate = rawDate;
    $this.completion = ko.observable(false);

    $this.completeTask = function () {
        if ($this.completion() == false) {
            $this.completion(true);
        } else {
            console.log('False answer');
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
    })
}

function taskViewModel() {
    var $this = this;
    $this.tasks = ko.observableArray([
        new todoTask("Buy Colgate", new Date()),
        new todoTask("Buy Milk", new Date())
    ]);

    $this.newTask = ko.observable("");

    $this.addTask = function () {
        $this.tasks.push(new todoTask($this.newTask, new Date()));
        $this.newTask("");
    };

    $this.removeTask = function () {
        $this.tasks.remove(this);
    }
}

ko.applyBindings(new taskViewModel());