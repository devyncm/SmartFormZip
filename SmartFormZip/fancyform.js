"use strict";

function check_non_empty(item) {
	if (item.value == "") {
        alert("The " + item.name + " was left empty.");
        return false;
	}

	return true;
}

function check_email(item) {
	// email regex
	email = /^\S+@\S+\.\S+$/;
	if(!item.value.match(email)) {
		alert("The " + item.name + " field isn't filled in correctly.");
		return false;
	}

	return true;
}

function check_zip(item) {
	// zip code regex
	let numbers = /^\d{5}$/;
	if(!item.value.match(numbers)) {
                alert("The " + item.name + " field isn't filled in correctly.");
                return false;
        }

	return true;
}

function check_form() {
	var item = document.getElementById("firstname");
	if(check_non_empty(item) == false) {
		item.focus();
		return false;
	}

	item = document.getElementById("lastname");
        if(check_non_empty(item) == false) {
                item.focus();
                return false;
        }

	item = document.getElementById("email");
        if(check_email(item) == false) {
                item.focus();
                return false;
        }

	item = document.getElementById("address1");
	if(check_non_empty(item) == false) {
		item.focus();
		return false;
	}

        item = document.getElementById("city");
        if(check_non_empty(item) == false) {
                item.focus();
                return false;
        }

	item = document.getElementById("state");
        if(check_non_empty(item) == false) {
                item.focus();
                return false;
        }

	item = document.getElementById("zip");
        if(check_zip(item) == false) {
                item.focus();
                return false;
        }

	return true;
}

function keystruck(event) {
	textbox = document.getElementById("zip");
	get_city_state(textbox.value);
}

function get_city_state(zip) {
	if(zip.length != 5) {
		return;
	}

	var xhr = new XMLHttpRequest();

	xhr.open("GET", "./zip2statecity.cgi?" + zip, true);

	xhr.onload = function(e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				show_city_state(xhr.responseText);
			} else {
				show_city_state(null);
			}
		}
	};

	xhr.send(null);
}

function show_city_state(text) {
	var citytextbox = document.getElementById("city");
	var statetextbox = document.getElementById("state");

	// split the values into an array
	const values = text.split(/\n/);

	// put the values into the text boxes
	citytextbox.value = values[0];
	statetextbox.value = values[1];
}
