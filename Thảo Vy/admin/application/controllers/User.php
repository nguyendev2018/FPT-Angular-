<?php 

if(!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH . '/libraries/BaseController.php';

/**
 * Class : User (UserController)
 * User Class to control all user related operations.
 * @author : Samet Aydın / sametay153@gmail.com
 * @version : 1.0
 * @since : 27.02.2018
 */
class User extends BaseController
{
    /**
     * This is default constructor of the class
     */
    public function __construct()
    {
        parent::__construct();
        $this->load->model('user_model');
        $this->isLoggedIn();
    }
    
    /**
     * This function used to load the first screen of the user
     */
    public function index()
    {
        $this->global['pageTitle'] = 'COUPON : Trang chủ';

        $data['productsCount'] = $this->user_model->productsCount();
        $data['finishedProductsCount'] = $this->user_model->finishedProductsCount();
        $data['logsCount'] = $this->user_model->logsCount();
        $data['usersCount'] = $this->user_model->usersCount();

        if ($this->getUserStatus() == TRUE)
        {
            $this->session->set_flashdata('error', 'Vui lòng thay đổi mật khẩu của bạn trước để bảo mật.');
            redirect('loadChangePass');
        }

        $this->loadViews("dashboard", $this->global, $data , NULL);
    }

    /**
     * This function is used to check whether email already exist or not
     */
    function checkEmailExists()
    {
        $userId = $this->input->post("userId");
        $email = $this->input->post("email");

        if(empty($userId)){
            $result = $this->user_model->checkEmailExists($email);
        } else {
            $result = $this->user_model->checkEmailExists($email, $userId);
        }

        if(empty($result)){ echo("true"); }
        else { echo("false"); }
    }

    /**
     * This function is used to load edit user view
     */
    function loadUserEdit()
    {
        $this->global['pageTitle'] = 'COUPON : Cài đặt tài khoản';
        
        $data['userInfo'] = $this->user_model->getUserInfo($this->vendorId);

        $this->loadViews("userEdit", $this->global, $data, NULL);
    }

    /**
     * This function is used to update the of the user info
     */
    function updateUser()
    {
        $this->load->library('form_validation');
            
        $userId = $this->input->post('userId');
        
        $this->form_validation->set_rules('fname','Full Name','trim|required|max_length[128]');
        $this->form_validation->set_rules('email','Email','trim|required|valid_email|max_length[128]');
        $this->form_validation->set_rules('oldpassword','Old password','max_length[20]');
        $this->form_validation->set_rules('cpassword','Password','matches[cpassword2]|max_length[20]');
        $this->form_validation->set_rules('cpassword2','Confirm Password','matches[cpassword]|max_length[20]');
        $this->form_validation->set_rules('mobile','Mobile Number','required|min_length[10]');
        
        if($this->form_validation->run() == FALSE)
        {
            $this->loadUserEdit();
        }
        else
        {
            $name = $this->security->xss_clean($this->input->post('fname'));
            $email = $this->security->xss_clean($this->input->post('email'));
            $password = $this->input->post('cpassword');
            $mobile = $this->security->xss_clean($this->input->post('mobile'));
            $oldPassword = $this->input->post('oldpassword');

            $userInfo = array();

            if(empty($password))
            {
            $userInfo = array('email'=>$email,'name'=>$name,
                            'mobile'=>$mobile, 'status'=>1, 'updatedBy'=>$this->vendorId, 'updatedDtm'=>date('Y-m-d H:i:s'));
            }
            else
            {
                $resultPas = $this->user_model->matchOldPassword($this->vendorId, $oldPassword);
            
                if(empty($resultPas))
                {
                $this->session->set_flashdata('nomatch', 'Mật khẩu cũ của bạn không đúng');
                redirect('userEdit');
                }
                else
                {
                $userInfo = array('email'=>$email, 'password'=>getHashedPassword($password),
                    'name'=>ucwords($name), 'mobile'=>$mobile,'status'=>1, 'updatedBy'=>$this->vendorId, 
                    'updatedDtm'=>date('Y-m-d H:i:s'));
                }
            }
            
            $result = $this->user_model->editUser($userInfo, $userId);
            
            if($result == true)
            {
                $process = 'Cập nhật cài đặt tài khoản';
                $processFunction = 'User/updateUser';
                $this->logrecord($process,$processFunction);

                $this->session->set_flashdata('success', 'Cài đặt Tài khoản của bạn đã được cập nhật thành công');
            }
            else
            {
                $this->session->set_flashdata('error', 'Cập nhật Cài đặt Tài khoản không thành công');
            }
            
            redirect('userEdit');
        }
    }


    
    /**
     * This function is used to load the change password view
     */
    function loadChangePass()
    {
        $this->global['pageTitle'] = 'COUPON : Đổi mật khẩu';
        
        $this->loadViews("changePassword", $this->global, NULL, NULL);
    }
    
    
    /**
     * This function is used to change the password of the user
     */
    function changePassword()
    {
        $this->load->library('form_validation');
        
        $this->form_validation->set_rules('oldPassword','Old password','required|max_length[20]');
        $this->form_validation->set_rules('newPassword','New password','required|max_length[20]');
        $this->form_validation->set_rules('cNewPassword','Confirm new password','required|matches[newPassword]|max_length[20]');
        
        if($this->form_validation->run() == FALSE)
        {
            $this->loadChangePass();
        }
        else
        {
            $oldPassword = $this->input->post('oldPassword');
            $newPassword = $this->input->post('newPassword');
            
            $resultPas = $this->user_model->matchOldPassword($this->vendorId, $oldPassword);
            
            if(empty($resultPas))
            {
                $this->session->set_flashdata('nomatch', 'Mật khẩu cũ của bạn không đúng');
                redirect('loadChangePass');
            }
            else
            {
                $usersData = array('password'=>getHashedPassword($newPassword),'status'=>1, 'updatedBy'=>$this->vendorId,
                                'updatedDtm'=>date('Y-m-d H:i:s'));
                
                $result = $this->user_model->changePassword($this->vendorId, $usersData);
                
                if($result > 0) {

                    $process = 'Đổi mật khẩu';
                    $processFunction = 'User/changePassword';
                    $this->logrecord($process,$processFunction);

                     $this->session->set_flashdata('success', 'Đổi mật khẩu thành công');
                     }
                else {
                     $this->session->set_flashdata('error', 'Đổi mật khẩu không thành công'); 
                    }
                
                redirect('loadChangePass');
            }
        }
    }

    /**
     * This function is used to open 404 view
     */
    function pageNotFound()
    {
        $this->global['pageTitle'] = 'COUPON : 404 - Không tìm thấy trang';
        
        $this->loadViews("404", $this->global, NULL, NULL);
    }

    /**
     * This function is used to finish tasks.
     */
    function endTask($taskId)
    {
            $taskInfo = array('statusId'=>2,'endDtm'=>date('Y-m-d H:i:s'));
            
            $result = $this->user_model->endTask($taskId, $taskInfo);
            
            if ($result > 0) {
                 $process = 'Hoàn thành một công việc';
                 $processFunction = 'User/endTask';
                 $this->logrecord($process,$processFunction);
                 $this->session->set_flashdata('success', 'Nhiệm vụ đã hoàn thành thành công');
                 if ($this->role != ROLE_EMPLOYEE){
                    redirect('tasks');
                 }
                 else{
                    redirect('etasks');
                 }
                }
            else {
                $this->session->set_flashdata('error', 'Không hoàn thành tác vụ được');
                if ($this->role != ROLE_EMPLOYEE){
                    redirect('tasks');
                 }
                 else{
                    redirect('etasks');
                 }
            }
    }

    /**
     * This function is used to open the tasks page for users (no edit/delete etc)
     */
    function etasks()
    {
            $data['taskRecords'] = $this->user_model->getTasks();

            $process = 'Tất cả nhiệm vụ Người dùng ';
            $processFunction = 'User/etasks';
            $this->logrecord($process,$processFunction);

            $this->global['pageTitle'] = 'COUPON : Tất cả các nhiệm vụ';
            
            $this->loadViews("etasks", $this->global, $data, NULL);
    }

         /**
     * This function used to show product
     */
    function product()
    {
            $data['productRecords'] = $this->user_model->getProducts();

            $process = 'Tất cả các coupon';
            $processFunction = 'User/products';
            $this->logrecord($process,$processFunction);

            $this->global['pageTitle'] = 'COUPON : Tất cả các coupon';
            
            $this->loadViews("products", $this->global, $data, NULL);
    }

    /**
     * This function is used to load the add new product
     */
    function addNewProduct()
    {
            $data['products_categories'] = $this->user_model->getProductsCategories();

            $this->global['pageTitle'] = 'COUPON : Thêm mã Coupon';

            $this->loadViews("addNewProduct", $this->global, $data, NULL);
    }

     /**
     * This function is used to add new product to the system
     */
    function addNewProducts()
    {
            $this->load->library('form_validation');
            
            $this->form_validation->set_rules('pro_name','Tên Coupon','required');
            $this->form_validation->set_rules('pro_price','Giá trị coupon','required');
            $this->form_validation->set_rules('pro_details','Mô tả coupon','required');
            $this->form_validation->set_rules('namecate','Nhà cung cấp coupon','required');
            
            if($this->form_validation->run() == FALSE)
            {
                $this->addNewProduct();
            }
            else
            {
                $pro_name = $this->input->post('pro_name');
                $pro_details = $this->input->post('pro_details');
                if(isset($_FILES['pro_img'])){
                  $errors= array();
                  $file_name = $_FILES['pro_img']['name'];
                  $file_size = $_FILES['pro_img']['size'];
                  $file_tmp = $_FILES['pro_img']['tmp_name'];
                  $file_type = $_FILES['pro_img']['type'];
                  $file_ext=strtolower(end(explode('.',$_FILES['pro_img']['name'])));
                   
                  $expensions= array("jpeg","jpg","png");
                   
                  if(in_array($file_ext,$expensions)=== false){
                     $errors[]="Chỉ hỗ trợ upload file JPEG hoặc PNG.";
                  }
                   
                  if($file_size > 2097152) {
                     $errors[]='Kích thước file không được lớn hơn 2MB';
                  }
                   
                  if(empty($errors)==true) {
                     move_uploaded_file($file_tmp,'./pro_img/'.$file_name);
                     echo "Success";
                  }else{
                     print_r($errors);
                  }
                }
                $pro_img = $_FILES['pro_img']['name'];
                $pro_price = $this->input->post('pro_price');
                $id = $this->input->post('namecate');
                $permalink = sef($pro_name);
                
                $productInfo = array('pro_name'=>$pro_name, 'pro_details'=>$pro_details, 'id'=>$id, 
                                    'pro_img'=> $pro_img,'pro_price'=>$pro_price,'permalink'=>$permalink,
                                    'createdBy'=>$this->vendorId, 'pcreatedDtm'=>date('Y-m-d H:i:s'));
                                    
                $result = $this->user_model->addNewProducts($productInfo);
                
                if($result > 0)
                {
                    $process = 'Thêm Coupon';
                    $processFunction = 'User/addNewProcuts';
                    $this->logrecord($process,$processFunction);

                    $this->session->set_flashdata('success', 'Coupon đã được thêm thành công');
                }
                else
                {
                    $this->session->set_flashdata('error', 'Thêm Coupon không thành công');
                }
                
                redirect('addNewProduct');
            }
        }

    /**
     * This function is used to open edit product view
     */
    function editOldProduct($productId = NULL)
    {
            if($productId == null)
            {
                redirect('product');
            }
            
            $data['productInfo'] = $this->user_model->getProductInfo($productId);
            $data['products_categories'] = $this->user_model->getProductsCategories();
            
            $this->global['pageTitle'] = 'COUPON : Chỉnh sửa Coupon';
            
            $this->loadViews("editOldProduct", $this->global, $data, NULL);
    }

    /**
     * This function is used to edit product
     */
    function editProduct()
    {       
            
        $this->load->library('form_validation');

        $this->form_validation->set_rules('pro_name','Tên coupon','required');
        $this->form_validation->set_rules('pro_price','Giá trị coupon','required');
        $this->form_validation->set_rules('pro_details','Mô tả coupon','required');
        $this->form_validation->set_rules('namecate','Nhà cung cấp coupon','required');
        
        $productId = $this->input->post('productId');

        if($this->form_validation->run() == FALSE)
        {
            $this->editOldProduct($productId);
        }
        else
        {
            $productId = $this->input->post('productId');
            $pro_name = $this->input->post('pro_name');
            $pro_details = $this->input->post('pro_details');
            // echo "<pre>";
            // print_r($_FILES['pro_img']);
            // echo "</pre>";
            // die();
            if(isset($_FILES['pro_img'])){
                $errors= array();
                $file_name = $_FILES['pro_img']['name'];
                $file_size = $_FILES['pro_img']['size'];
                $file_tmp = $_FILES['pro_img']['tmp_name'];
                $file_type = $_FILES['pro_img']['type'];
                $file_ext=strtolower(end(explode('.',$_FILES['pro_img']['name'])));
                 
                $expensions= array("jpeg","jpg","png");
                 
                if(in_array($file_ext,$expensions)=== false){
                   $errors[]="Chỉ hỗ trợ upload file JPEG hoặc PNG.";
                }
                 
                if($file_size > 2097152) {
                   $errors[]='Kích thước file không được lớn hơn 2MB';
                }
                 
                if(empty($errors)==true) {
                   move_uploaded_file($file_tmp,'./pro_img/'.$file_name);
                   echo "Success";
                }else{
                   print_r($errors);
                }
              }
            $pro_img = $_FILES['pro_img']['name'];
            $pro_price = $this->input->post('pro_price');
            $id = $this->input->post('namecate');
            $permalink = sef($pro_name);
            
            $productInfo = array('pro_name'=>$pro_name, 'pro_details'=>$pro_details, 'pro_img'=>$pro_img, 'pro_price'=> $pro_price, 'id'=>$id, 'permalink'=>$permalink);
                                
            $result = $this->user_model->editProduct($productInfo,$productId);
            
            if($result > 0)
            {
                $process = 'Chỉnh sửa Coupon';
                $processFunction = 'User/editProduct';
                $this->logrecord($process,$processFunction);
                $this->session->set_flashdata('success', 'Chỉnh sửa Coupon thành công');
            }
            else
            {
                $this->session->set_flashdata('error', 'Chỉnh sửa Coupon không thành công');
            }
            redirect('product');

            }
    }

    /**
     * This function is used to delete products
     */
    function deleteProduct($productId = NULL)
    {
        if($productId == null)
            {
                redirect('product');
            }

            $result = $this->user_model->deleteProduct($productId);
            
            if ($result == TRUE) {
                 $process = 'Xóa Coupon';
                 $processFunction = 'User/deleteProduct';
                 $this->logrecord($process,$processFunction);

                 $this->session->set_flashdata('success', 'Xóa Coupon thành công');
                }
            else
            {
                $this->session->set_flashdata('error', 'Xóa Coupon không thành công');
            }
            redirect('product');
    }

    


     /**
     * This function used to show blog
     */
    function blog()
    {
            $data['blogRecords'] = $this->user_model->getBlogs();

            $process = 'Tất cả các bài viết';
            $processFunction = 'User/blogs';
            $this->logrecord($process,$processFunction);

            $this->global['pageTitle'] = 'BLOG: Tất cả các bài viết';
            
            $this->loadViews("blogs", $this->global, $data, NULL);
    }

    /**
     * This function is used to load the add new blog
     */
    function addNewBlog()
    {
            $data['blogs_categories'] = $this->user_model->getBlogsCategories();

            $this->global['pageTitle'] = 'BLOG: Thêm bài viết';

            $this->loadViews("addNewBlog", $this->global, $data, NULL);
    }

     /**
     * This function is used to add new blog to the system
     */
    function addNewBlogs()
    {
            $this->load->library('form_validation');
            
            $this->form_validation->set_rules('blog_tittle','Tiêu đề bài viết','required');
            $this->form_validation->set_rules('blog_content','Nội dung bài vết','required');
            $this->form_validation->set_rules('namecate','Thể loại bài viết','required');
            
            if($this->form_validation->run() == FALSE)
            {
                $this->addNewBlog();
            }
            else
            {
                $blog_tittle = $this->input->post('blog_tittle');
                $blog_content = $this->input->post('blog_content');
                if(isset($_FILES['blog_img'])){
                  $errors= array();
                  $file_name = $_FILES['blog_img']['name'];
                  $file_size = $_FILES['blog_img']['size'];
                  $file_tmp = $_FILES['blog_img']['tmp_name'];
                  $file_type = $_FILES['blog_img']['type'];
                  $file_ext=strtolower(end(explode('.',$_FILES['blog_img']['name'])));
                   
                  $expensions= array("jpeg","jpg","png","gif");
                   
                  if(in_array($file_ext,$expensions)=== false){
                     $errors[]="Chỉ hỗ trợ upload file JPEG, GIF hoặc PNG.";
                  }
                   
                  if($file_size > 2097152) {
                     $errors[]='Kích thước file không được lớn hơn 2MB';
                  }
                   
                  if(empty($errors)==true) {
                     move_uploaded_file($file_tmp,'./blog_img/'.$file_name);
                     echo "Success";
                  }else{
                     print_r($errors);
                  }
                }
                $blog_img = $_FILES['blog_img']['name'];
                $id = $this->input->post('namecate');
                $permalink = sef($blog_tittle);
                
                $productInfo = array('blog_tittle'=>$blog_tittle, 'blog_content'=>$blog_content, 'id'=>$id, 
                                    'blog_img'=> $blog_img,'permalink'=>$permalink,
                                    'createdBy'=>$this->vendorId, 'bcreatedDtm'=>date('Y-m-d H:i:s'));
                                    
                $result = $this->user_model->addNewBlogs($productInfo);
                
                if($result > 0)
                {
                    $process = 'Thêm bài viết';
                    $processFunction = 'User/addNewBlogs';
                    $this->logrecord($process,$processFunction);

                    $this->session->set_flashdata('success', 'Bài viết đã được thêm thành công');
                }
                else
                {
                    $this->session->set_flashdata('error', 'Thêm Bài viết không thành công');
                }
                
                redirect('addNewBlog');
            }
        }

    /**
     * This function is used to open edit blog view
     */
    function editOldBlog($blogId = NULL)
    {
            if($blogId == null)
            {
                redirect('blog');
            }
            
            $data['blogInfo'] = $this->user_model->getBlogInfo($blogId);
            $data['blogs_categories'] = $this->user_model->getBlogsCategories();
            
            $this->global['pageTitle'] = 'BLOG : Chỉnh sửa bài viết';
            
            $this->loadViews("editOldBlog", $this->global, $data, NULL);
    }

    /**
     * This function is used to edit blog
     */
    function editBlog()
    {       
            
        $this->load->library('form_validation');

        $this->form_validation->set_rules('blog_tittle','Tiêu đề bài viết','required');
        $this->form_validation->set_rules('blog_content','Nội dung bài vết','required');
        $this->form_validation->set_rules('namecate','Thể loại bài viết','required');
        
        $blogId = $this->input->post('blogId');

        if($this->form_validation->run() == FALSE)
        {
            $this->editOldBlog($blogId);
        }
        else
        {
            $blogId = $this->input->post('blogId');
            $blog_tittle = $this->input->post('blog_tittle');
            $blog_content = $this->input->post('blog_content');
            // echo "<pre>";
            // print_r($_FILES['pro_img']);
            // echo "</pre>";
            // die();
            if(isset($_FILES['blog_img'])){
                $errors= array();
                $file_name = $_FILES['blog_img']['name'];
                $file_size = $_FILES['blog_img']['size'];
                $file_tmp = $_FILES['blog_img']['tmp_name'];
                $file_type = $_FILES['blog_img']['type'];
                $file_ext=strtolower(end(explode('.',$_FILES['blog_img']['name'])));
                 
                $expensions= array("jpeg","jpg","png","gif");
                 
                if(in_array($file_ext,$expensions)=== false){
                   $errors[]="Chỉ hỗ trợ upload file JPEG, GIF hoặc PNG.";
                }
                 
                if($file_size > 2097152) {
                   $errors[]='Kích thước file không được lớn hơn 2MB';
                }
                 
                if(empty($errors)==true) {
                   move_uploaded_file($file_tmp,'./blog_img/'.$file_name);
                   echo "Success";
                }else{
                   print_r($errors);
                }
              }
            $blog_img = $_FILES['blog_img']['name'];
            $id = $this->input->post('namecate');
            $permalink = sef($blog_tittle);
            
            $blogInfo = array('blog_tittle'=>$blog_tittle, 'blog_content'=>$blog_content, 'blog_img'=>$blog_img, 'id'=>$id, 'permalink'=>$permalink);
                                
            $result = $this->user_model->editBlog($blogInfo,$blogId);
            
            if($result > 0)
            {
                $process = 'Chỉnh sửa bài viết';
                $processFunction = 'User/editBlog';
                $this->logrecord($process,$processFunction);
                $this->session->set_flashdata('success', 'Chỉnh sửa bài viết thành công');
            }
            else
            {
                $this->session->set_flashdata('error', 'Chỉnh sửa bài viết không thành công');
            }
            redirect('blog');

            }
    }

    /**
     * This function is used to delete blogs
     */
    function deleteBlog($blogId = NULL)
    {
        if($blogId == null)
            {
                redirect('blog');
            }

            $result = $this->user_model->deleteBlog($blogId);
            
            if ($result == TRUE) {
                 $process = 'Xóa bài viết';
                 $processFunction = 'User/deleteBlog';
                 $this->logrecord($process,$processFunction);

                 $this->session->set_flashdata('success', 'Xóa bài viết thành công');
                }
            else
            {
                $this->session->set_flashdata('error', 'Xóa bài viết không thành công');
            }
            redirect('blog');
    }

}

?>