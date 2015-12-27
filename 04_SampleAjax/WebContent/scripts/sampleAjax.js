$(document).ready(function(){
	"use strict";
	var ENDPOINT = "http://localhost:3000/tasks";
	function taskEndpoint(taskId){
		return ENDPOINT + "/" + taskId;
	}

	$(document).ajaxError(function(){
			console.log("error:", arguments);
		alert("Error!");
	});

	$.ajax(ENDPOINT, {
		method: "GET",
		data:{
			title:"task1"
		},
		dataType: "json"


	}).then(function(response){
		console.log(response);
	});


	// read single task by id
	$.ajax(taskEndpoint(2), {
		method: "GET",
		dataType: "json"

		
	}).then(function(response){
		console.log(response);
	});

	//add task
	var task = {
		title: "hello",
		description: "some text"
	};

	var taskNewId;
	var createPromise = $.ajax(ENDPOINT, {
		method: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(task),
		dataType: "json"
	}).then(function(response){
		console.log(response);
		return response;
	
	});

	// update task
	task.title = "Hello World";
	$.ajax(taskEndpoint(2), {
		method: "PUT",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			title:"updated",
			description: "updated desc"
		}),
		dataType: "json"
	}).then(function(response){
		console.log(response);
	});


createPromise.then(function(response){
	$.ajax(taskEndpoint(response.id),{
		method: "DELETE"
	});
});



});