var require = meteorInstall({"imports":{"api":{"tasks.js":["meteor/meteor","meteor/mongo","meteor/check",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// imports/api/tasks.js                                                                        //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
module.export({                                                                                // 1
  Tasks: function () {                                                                         // 1
    return Tasks;                                                                              // 1
  }                                                                                            // 1
});                                                                                            // 1
var Meteor = void 0;                                                                           // 1
module.importSync("meteor/meteor", {                                                           // 1
  Meteor: function (v) {                                                                       // 1
    Meteor = v;                                                                                // 1
  }                                                                                            // 1
}, 0);                                                                                         // 1
var Mongo = void 0;                                                                            // 1
module.importSync("meteor/mongo", {                                                            // 1
  Mongo: function (v) {                                                                        // 1
    Mongo = v;                                                                                 // 1
  }                                                                                            // 1
}, 1);                                                                                         // 1
var check = void 0;                                                                            // 1
module.importSync("meteor/check", {                                                            // 1
  check: function (v) {                                                                        // 1
    check = v;                                                                                 // 1
  }                                                                                            // 1
}, 2);                                                                                         // 1
var Tasks = new Mongo.Collection('tasks');                                                     // 5
                                                                                               //
if (Meteor.isServer) {                                                                         // 7
  // This code only runs on the server                                                         // 8
  // Only publish tasks that are public or belong to the current user                          // 9
  Meteor.publish('tasks', function () {                                                        // 10
    function tasksPublication() {                                                              // 10
      return Tasks.find({                                                                      // 11
        $or: [{                                                                                // 12
          "private": {                                                                         // 13
            $ne: true                                                                          // 13
          }                                                                                    // 13
        }, {                                                                                   // 13
          owner: this.userId                                                                   // 14
        }]                                                                                     // 14
      });                                                                                      // 11
    }                                                                                          // 17
                                                                                               //
    return tasksPublication;                                                                   // 10
  }());                                                                                        // 10
}                                                                                              // 18
                                                                                               //
Meteor.methods({                                                                               // 20
  'tasks.insert': function (text) {                                                            // 21
    check(text, String); // Make sure the user is logged in before inserting a task            // 22
    /*if (! this.userId) {                                                                     // 25
      throw new Meteor.Error('not-authorized');                                                //
    }*/                                                                                        //
    var meteorUser = Meteor.users.findOne(this.userId);                                        // 28
    var meteorUsername = meteorUser ? meteorUser.username : 'unknown_user';                    // 29
    Tasks.insert({                                                                             // 31
      text: text,                                                                              // 32
      createdAt: new Date(),                                                                   // 33
      owner: this.userId,                                                                      // 34
      username: meteorUsername                                                                 // 35
    });                                                                                        // 31
  },                                                                                           // 37
  'tasks.remove': function (taskId) {                                                          // 38
    check(taskId, String);                                                                     // 39
    var task = Tasks.findOne(taskId);                                                          // 41
                                                                                               //
    if (task.private && task.owner !== this.userId) {                                          // 42
      // If the task is private, make sure only the owner can delete it                        // 43
      throw new Meteor.Error('not-authorized');                                                // 44
    }                                                                                          // 45
                                                                                               //
    Tasks.remove(taskId);                                                                      // 47
  },                                                                                           // 48
  'tasks.setChecked': function (taskId, setChecked) {                                          // 49
    check(taskId, String);                                                                     // 50
    check(setChecked, Boolean);                                                                // 51
    var task = Tasks.findOne(taskId);                                                          // 53
                                                                                               //
    if (task.private && task.owner !== this.userId) {                                          // 54
      // If the task is private, make sure only the owner can check it off                     // 55
      throw new Meteor.Error('not-authorized');                                                // 56
    }                                                                                          // 57
                                                                                               //
    Tasks.update(taskId, {                                                                     // 59
      $set: {                                                                                  // 59
        checked: setChecked                                                                    // 59
      }                                                                                        // 59
    });                                                                                        // 59
  },                                                                                           // 60
  'tasks.setPrivate': function (taskId, setToPrivate) {                                        // 61
    check(taskId, String);                                                                     // 62
    check(setToPrivate, Boolean);                                                              // 63
    var task = Tasks.findOne(taskId); // Make sure only the task owner can make a task private
                                                                                               //
    if (task.owner !== this.userId) {                                                          // 68
      throw new Meteor.Error('not-authorized');                                                // 69
    }                                                                                          // 70
                                                                                               //
    Tasks.update(taskId, {                                                                     // 72
      $set: {                                                                                  // 72
        "private": setToPrivate                                                                // 72
      }                                                                                        // 72
    });                                                                                        // 72
  }                                                                                            // 73
});                                                                                            // 20
/////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"server":{"main.js":["../imports/api/tasks.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// server/main.js                                                                              //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
module.importSync("../imports/api/tasks.js");                                                  // 1
/////////////////////////////////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json",".jsx"]});
require("./server/main.js");
//# sourceMappingURL=app.js.map
