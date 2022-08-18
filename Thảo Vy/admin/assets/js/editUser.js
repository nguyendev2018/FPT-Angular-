/**
 * File : editUser.js 
 * 
 * This file contain the validation of edit user form
 * 
 * @author Kishor Mali
 */
$(document).ready(function(){
	
	var editUserForm = $("#editUser");
	
	var validator = editUserForm.validate({
		
		rules:{
			fname :{ required : true },
			email : { required : true, email : true, remote : { url : baseURL + "checkEmailExists", type :"post", data : { userId : function(){ return $("#userId").val(); } } } },
			cpassword : {equalTo: "#password"},
			mobile : { required : true, digits : true },
			role : { required : true, selected : true}
		},
		messages:{
			fname :{ required : "Thông tin này là bắt buộc" },
			email : { required : "Thông tin này là bắt buộc", email : "Hãy nhập địa chỉ mail", remote : "Mail đã tồn tại" },
			cpassword : {equalTo: "Hãy nhập mật khẩu" },
			mobile : { required : "Thông tin này là bắt buộc", digits : "Chỉ được nhập số" },
			role : { required : "Thông tin này là bắt buộc", selected : "Chỉ lựa chọn các mục có sẵn" }			
		}
	});
});