/**
 * File : addUser.js
 * 
 * This file contain the validation of add user form
 * 
 * Using validation plugin : jquery.validate.js
 * 
 * @author Kishor Mali
 */

$(document).ready(function(){
	
	var addUserForm = $("#addUser");
	
	var validator = addUserForm.validate({
		
		rules:{
			fname :{ required : true },
			email : { required : true, email : true, remote : { url : baseURL + "checkEmailExists", type :"post"} },
			password : { required : true },
			cpassword : {required : true, equalTo: "#password"},
			mobile : { required : true, digits : true },
			role : { required : true, selected : true}
		},
		messages:{
			fname :{ required : "Thông tin này là bắt buộc" },
			email : { required : "Thông tin này là bắt buộc", email : "Vui lòng nhập địa chỉ email hợp lệ", remote : "Maill này đã tồn tại" },
			password : { required : "Thông tin này là bắt buộc" },
			cpassword : {required : "Thông tin này là bắt buộc", equalTo: "Hãy nhập mật khẩu" },
			mobile : { required : "Thông tin này là bắt buộc", digits : "Hãy nhập số điện thoại" },
			role : { required : "Thông tin này là bắt buộc", selected : "Hãy chọn chức vụ" }			
		}
	});
});
