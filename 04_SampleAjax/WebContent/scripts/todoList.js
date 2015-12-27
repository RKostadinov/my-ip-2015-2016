$(document).ready(function(){
	"use strict";

	var ENDPOINT = "http://localhost:3000/tasks";

	function showPanel(panelName){
		var ALL_PANELS = ["emptyPanel", "readPanel", "updatePanel", "createPanel"];

		_.forEach(ALL_PANELS, function(nextValue){
			$("#"+nextValue).hide();
		});
		$("#"+panelName).show();}

	function taskEndpoint(taskId){

		return ENDPOINT + "/" + taskId;}

	function listTasks(){
		return $.ajax(ENDPOINT, {
					method: "GET",
					dataType: "json"
				});}

	function readTask(taskId){
		return $.ajax(taskEndpoint(taskId), {
			method: "GET",
			dataType: "json"
		});}

	function showTaskView(task){
		$("#readPanel .task-title").text(task.title);
		$("#readPanel .task-description").text(task.description);
		showPanel("readPanel");
	}

	function reloadTasks(){
		listTasks().then(function(response){
			function addTaskToList(task){
				var newItem = $("<li />");
				newItem.text(task.title);
				newItem.addClass("list-group-item");
				newItem.attr("data-task-id", task.id);
				$("#tasksList").append(newItem);
			}

			$("#tasksList").html("");
			_.forEach(response, addTaskToList);
		});}
	var currentOpenTask;
	
	function attachHandlers(){
		$(document).on("click", "#tasksList [data-task-id]", function(){
			currentOpenTask = $(this).attr("data-task-id");
			readTask(currentOpenTask).then(showTaskView);
		});

		$(".task-action-cancel").click(function(){
			showPanel("emptyPanel");
		});
		
		$(".task-action-remove").click(function(){
			$.ajax(taskEndpoint(currentOpenTask),{
				method: "DELETE"
			}).then(reloadTasks);
			showPanel("emptyPanel");
		});
		
		$("#addTaskButton").click(function(){
			showPanel("createPanel");
		});
		
		$("#createPanel .task-action-ok").click(function(){
			var task = {
				title: $("#createPanel input[name='title']").val(),
				description: $("#createPanel textarea").val()
			};
			$.ajax(ENDPOINT, {
				method: "POST",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(task),
				dataType: "json"
			}).then(reloadTasks).then(function(){
				$("#createPanel input[name='title']").val("");
				$("#createPanel textarea").val("");
			}).then(showPanel("emptyPanel"));
		});
		
		$("#readPanel .task-action-ok").click(function(){
			
			var title =  $("#readPanel form .task-title").text();
			var description = $("#readPanel form .task-description").text();
	
			$("#updatePanel input[name='title']").val(title);
			$("#updatePanel textarea").val(description);
			showPanel("updatePanel");

		});
		
		$("#updatePanel .task-action-ok").click(function(){
			var task = {
				title: $("#updatePanel input[name='title']").val(),
				description: $("#updatePanel textarea").val()
			};
			$.ajax(taskEndpoint(currentOpenTask), {
				method: "PUT",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(task),
				dataType: "json"
			}).then(reloadTasks).then(showPanel("emptyPanel"));
		});
		
	}
	
	attachHandlers();
	reloadTasks();
});

/*
*********HOMEWORK***********
	1.delete
	edit - save
	add - createPanel - ok 
********ENDHOMEWORK*********
*/