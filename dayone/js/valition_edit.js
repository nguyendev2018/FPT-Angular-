var form = document.getElementById('forms');
var first_name = document.getElementById('firstname');
var last_name = document.getElementById('lastname');
var phone = document.getElementById('phone');
var description = document.getElementById('description');
form.addEventListener('submit', e => {
	e.preventDefault();
	checkInput();
});

function checkInput() {
	// trim to remove the whitespaces
	var first_nameValue = first_name.value.trim();  
	var last_nameValue = first_name.value.trim();  
	var phoneValue = phone.value.trim();
	var descriptionValue = description.value.trim();
	
	if(first_nameValue === '') {
		setErrorFor(first_name, 'first_name không thể bỏ trống');
	} else {
		setSuccessFor(first_name);
	}
	if(last_nameValue === '') {
		setErrorFor(last_name, 'last_name không thể bỏ trống');
	} else {
		setSuccessFor(last_name);
	}
	if(phoneValue === '') {
		setErrorFor(phone, 'phone không thể bỏ trống');
	} else {
		setSuccessFor(phone);
	}
	
	if(descriptionValue === '') {
		setErrorFor(description, 'description không thể bỏ trống');
	} else {
		setSuccessFor(description);
	}
	
}

function setErrorFor(input, message) {
	var formControl = input.parentElement;
	var small = formControl.querySelector('small');
	formControl.className = 'input-effect  error';
	small.innerText = message;
}

function setSuccessFor(input) {
	var formControl = input.parentElement;
	formControl.className = 'input-effect  success';
}
	
