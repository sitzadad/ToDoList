var methods={
  init:function(){
    methods.initStyling();
    methods.initEvents();
  },
  initStyling:function(){
    methods.renderTasks();
    //$('.fa-check').toggle();
  },
  initEvents:function(){
    $('#createTaskForm').on('submit',function(e){
      e.preventDefault();
        var newTask={
          task:$(this).find('input[name="newTaskInput"]').val()
        };
        methods.createTask(newTask);
    });
    $('section').on('click','.fa-times',function(e){
      e.preventDefault();
       var taskId=$(this).closest('article').data('taskid');
       console.log(taskId);
       methods.deleteTask(taskId);
    });
    $('section').on('click','.fa-pencil-square-o',function(e){
      e.preventDefault();
      $(this).siblings('.editTaskForm').css('display','inline-block');
      $(this).siblings('h3').hide();
      $(this).hide();
    });
    $('section').on('submit','.editTaskForm',function(e){
      e.preventDefault();
      var taskId = $(this).closest('article').data('taskid');
      var editedTask = {
        task:$(this).find('input[name="editedTaskInput"]').val()
      };
      methods.updateTask(taskId,editedTask);
    });
    $('section').on('click','h3',function(e){
      e.preventDefault();
      $(this).siblings('.fa-check').toggle();
    });
  },
  config:{
    url:'http://tiy-fee-rest.herokuapp.com/collections/adamS',
  },
  createTask:function(inputTask){
    $.ajax({
      url: methods.config.url,
      data: inputTask,
      type: 'POST',
      success:function(data){
        console.log(data);
        methods.renderTasks();
      },
      error:function(error){
        console.log(error);
      }
    });
  },
  renderTasks:function(){
    $.ajax({
      url:methods.config.url,
      type:'GET',
      success:function(retrievedTasks){
        console.log(retrievedTasks);
        var template=_.template($('#myTmpl').html());
        var loadingString="";
        retrievedTasks.forEach(function(singleTask){
          loadingString+=template(singleTask);
        });
        console.log('this is all of the tasks => ',loadingString);
        $('section').html(loadingString);
        $('input[name="newTaskInput"]').val('');
      },
      error:function(error){
        console.log(error);
      }
    });
  },
  deleteTask:function(id){
    $.ajax({
      url:methods.config.url+'/'+id,
      type:'DELETE',
      success:function(data){
        console.log(data);
        methods.renderTasks();
      },
      error:function(error){
        console.log(error);
      }
    });
  },
  updateTask: function (id,updatedTask) {
    $.ajax({
      url:methods.config.url + '/' + id,
      data:updatedTask,
      type:'PUT',
      success:function(data){
        console.log(data);
        methods.renderTasks();
      },
      error:function(error){
        console.log(error);
      }
    });
  }
};

$(document).ready(function () {
  methods.init();
});
