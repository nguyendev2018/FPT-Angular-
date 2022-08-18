<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>
    <?php echo $pageTitle; ?>
  </title>
  <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
  <!-- Bootstrap 3.3.4 -->
  <link href="<?php echo base_url(); ?>assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
  <!-- FontAwesome 4.3.0 -->
  <link href="<?php echo base_url(); ?>assets/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
  <!-- Ionicons 2.0.0 -->
  <link href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css" />
  <!-- Theme style -->
  <link href="<?php echo base_url(); ?>assets/dist/css/AdminLTE.min.css" rel="stylesheet" type="text/css" />
  <!-- Datatables style -->
  <link href="<?php echo base_url(); ?>assets/bootstrap/css/table.css" rel="stylesheet" type="text/css" />

  
  <!-- AdminLTE Skins. Choose a skin from the css/skins 
         folder instead of downloading all of them to reduce the load. -->
  <link href="<?php echo base_url(); ?>assets/dist/css/skins/_all-skins.min.css" rel="stylesheet" type="text/css" />
  <style>
    .error {
      color: red;
      font-weight: normal;
    }
  </style>
  <!-- jQuery 2.1.4 -->
  <script src="<?php echo base_url(); ?>assets/js/jQuery-2.1.4.min.js"></script>
  <script type="text/javascript">
    var baseURL = "<?php echo base_url(); ?>";
  </script>

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body class="skin-blue sidebar-mini">
  <div class="wrapper">

    <header class="main-header">
      <!-- Logo -->
      <a href="<?php echo base_url(); ?>" class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini">
          <b>COUPON</b>U</span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg">
          <b>COUPON</b>&nbsp; ADMIN</span>
      </a>
      <!-- Header Navbar: style can be found in header.less -->
      <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">Chuyển hướng</span>
        </a>
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <li class="dropdown tasks-menu">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                <i class="fa fa-history"></i>
              </a>
              <ul class="dropdown-menu">
                <li class="header"> Lần đăng nhập cuôi:
                  <i class="fa fa-clock-o"></i>
                  <?= empty($last_login) ? "İlk Giriş" : $last_login; ?>
                </li>
              </ul>
            </li>
            <!-- User Account: style can be found in dropdown.less -->
            <li class="dropdown user user-menu">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <img src="<?php echo base_url(); ?>assets/dist/img/avatar.png" class="user-image" alt="User Image" />
                <span class="hidden-xs">
                  <?php echo $name; ?>
                </span>
              </a>
              <ul class="dropdown-menu">
                <!-- User image -->
                <li class="user-header">
                  <img src="<?php echo base_url(); ?>assets/dist/img/avatar.png" class="img-circle" alt="User Image" />
                  <p>
                    <?php echo $name; ?>
                    <small>
                      <?php echo $role_text; ?>
                    </small>
                  </p>
                </li>
                <!-- Menu Footer-->
                <li class="user-footer">
                  <div class="pull-left">
                    <a href="<?php echo base_url(); ?>userEdit" class="btn btn-default btn-flat">
                      <i class="fa fa-key"></i> Cài đặt tài khoản </a>
                  </div>
                  <div class="pull-right">
                    <a href="<?php echo base_url(); ?>logout" class="btn btn-default btn-flat">
                      <i class="fa fa-sign-out"></i> Đăng xuất </a>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu">
          <li class="treeview">
            <a href="<?php echo base_url(); ?>dashboard">
              <i class="fa fa-dashboard"></i>
              <span>Trang chủ</span>
              </i>
            </a>
          </li>
          <?php
            // Rol definetion in application/config/constants.php
            if($role == ROLE_ADMIN || $role == ROLE_MANAGER)
            {
            ?>
              <li class="treeview">
                <a href="<?php echo base_url(); ?>tasks">
                  <i class="fa fa-tasks"></i>
                  <span>Nhiệm vụ</span>
                </a>
              </li>
              <li class="treeview">
                <a href="<?php echo base_url(); ?>addNewTask">
                  <i class="fa fa-plus-circle"></i>
                  <span>Thêm nhiệm vụ</span>
                </a>
              </li>
              <li class="treeview">
                  <a href="<?php echo base_url(); ?>product">
                    <i class="fa fa-gift" aria-hidden="true" aria-hidden="true"></i>
                    <span>Coupon</span>
                  </a>
                </li>
                <li class="treeview">
                  <a href="<?php echo base_url(); ?>addNewProduct">
                    <i class="fa fa-plus-circle"></i>
                    <span>Thêm Coupon</span>
                  </a>
                </li>
                <li class="treeview">
                <a href="<?php echo base_url(); ?>blog">
                    <i class="fa fa-file-powerpoint-o" aria-hidden="true"></i>
                    <span>Bài viết</span>
                  </a>
                </li>
                <li class="treeview">
                  <a href="<?php echo base_url(); ?>addNewBlog">
                    <i class="fa fa-plus-circle"></i>
                    <span>Thêm bài viết</span>
                  </a>
                </li>
            <?php
            }
            if($role == ROLE_ADMIN)
            {
            ?>
              <li class="treeview">
                <a href="<?php echo base_url(); ?>userListing">
                  <i class="fa fa-users"></i>
                  <span>Người dùng</span>
                </a>
              </li>
              <li class="treeview">
                <a href="<?php echo base_url(); ?>addNew">
                  <i class="fa fa-plus-circle"></i>
                  <span>Thêm người dùng</span>
                </a>
              </li>
              <li class="treeview">
                <a href="<?php echo base_url(); ?>log-history">
                  <i class="fa fa-archive"></i>
                  <span>Bản ghi nhật ký</span>
                </a>
              </li>
              <li class="treeview">
                <a href="<?php echo base_url(); ?>log-history-upload">
                  <i class="fa fa-upload"></i>
                  <span>Tải sao lưu</span>
                </a>
              </li>
              <li class="treeview">
                <a href="<?php echo base_url(); ?>log-history-backup">
                  <i class="fa fa-archive"></i>
                  <span>Sao lưu bản ghi nhật ký</span>
                </a>
              </li>
              <?php
            }
            if($role == ROLE_EMPLOYEE)
            {
            ?>
                <li class="treeview">
                  <a href="<?php echo base_url(); ?>etasks">
                    <i class="fa fa-tasks"></i>
                    <span>Nhiệm vụ</span>
                  </a>
                  <a href="<?php echo base_url(); ?>product">
                    <i class="fa fa-gift" aria-hidden="true"></i>
                    <span>Coupon</span>
                  </a>
                  <a href="<?php echo base_url(); ?>addNewProduct">
                    <i class="fa fa-plus-circle"></i>
                    <span>Thêm Coupon</span>
                  </a>
                  <a href="<?php echo base_url(); ?>blog">
                    <i class="fa fa-file-powerpoint-o" aria-hidden="true"></i>
                    <span>Bài viết</span>
                  </a>
                  <a href="<?php echo base_url(); ?>addNewBlog">
                    <i class="fa fa-plus-circle"></i>
                    <span>Thêm bài viết</span>
                  </a>
                </li>
                  <?php
            }
            ?>
        </ul>
      </section>
      <!-- /.sidebar -->
    </aside>