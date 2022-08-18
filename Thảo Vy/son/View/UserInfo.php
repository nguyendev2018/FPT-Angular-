<!DOCTYPE html>
<html style="width: 100%;height: auto;">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>WEB3013 ASM</title>
    <link rel="stylesheet" href="Assets/Bootstrap/CSS/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700">
    <link rel="stylesheet" href="Assets/Fonts/Awesome/css/Awesome.css">
    <link rel="stylesheet" href="Assets/CSS/Copyright.css">
    <link rel="stylesheet" href="Assets/CSS/DataTable.css">
    <link rel="stylesheet" href="Assets/CSS/Form.css">
    <link rel="stylesheet" href="Assets/CSS/HeaderBlue.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.15/css/dataTables.bootstrap.min.css">
    <link rel="stylesheet" href="Assets/CSS/LoginForm.css">
    <link rel="stylesheet" href="Assets/CSS/Navigation.css">
    <link rel="stylesheet" href="Assets/CSS/Style.css">
    <link rel="stylesheet" href="Assets/CSS/UserInfo.css">
    <link href="Assets/SweetAlert/SweetAlert.css" rel="stylesheet">
</head>

<body style="width: auto;color: #fff;height: auto;">
<div>
    <div class="header-blue" style="height: 75px;padding: 0 0 0 0;">
        <nav class="navbar navbar-light navbar-expand-md navigation-clean-search">
            <div class="container-fluid">
                <a class="navbar-brand" href="?QPage=Home">QGarden</a>
                <button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navcol-1">
                    <ul class="nav navbar-nav">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link" href="?QPage=Home" style="color: #fff;">Home</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false" href="#" style="color: #fff;">Shops</a>
                            <div class="dropdown-menu" role="menu">
                                <?php
                                foreach ($HeaderLink as $MenuLink) echo '<a class="dropdown-item" role="presentation" href="?QPage=Home&Category='.$MenuLink['CategoryID'].'">'.$MenuLink['CategoryName'].'</a>';
                                ?>
                            </div>
                        </li>
                    </ul>
                    <form method="GET" action="?" class="form-inline mr-auto" target="_self">
                        <?=$Core -> BuildGetParam() ?>
                        <div class="form-group">
                            <label for="search-field">
                                <i class="fa fa-search" style="color: #fff;"></i>
                            </label>
                            <input class="form-control search-field" type="search" id="search-field" name="Search" placeholder="Bạn cần gì..." style="color: #fff;">
                        </div>
                    </form>
                    <?php
                    if (isset($_SESSION['Logged']) && $_SESSION['Logged'] === 1)
                    {
                        echo '<a class="btn btn-light action-button" role="presentation" href="?QPage=UserInfo" style="color: #fff;margin-bottom: 0;">'.$_SESSION['UserName'].'</a><a class="nav-link" style="color: #fff!important;" href="?QPage=Login&Out">Logout</a>';
                    }else echo '<a class="btn btn-light action-button" role="button" href="?QPage=Login" style="color: #fff;margin-bottom: 0;">Đăng Nhập</a>'; ?>
                    <i id="CartIcon" class="fas fa-shopping-cart d-xl-flex justify-content-xl-center align-items-xl-center" style="width: 32px;height: 32px;"></i>
                </div>
            </div>
        </nav>
    </div>
</div>
<div class="container" style="width: 80%;max-width: 90%;padding: 0;min-width: 0;margin: 0 auto;">
    <h1 style="color: #000;width: 100%;margin: 15px auto;">Profile</h1>
    <div class="card" style="width: 45%;height: auto;min-height: 170px;margin: 0 auto;">
        <div class="card-body" style="box-shadow: 3px 3px rgba(0, 0, 0, 0.25);">
            <div class="media">
                <div style="width: 150px;height: 100%;">
                    <img class="rounded-circle mr-3"
                         style="height: 100px;width: 100px;margin-top: 15px;margin-left: 15px; object-fit: cover;"
                         src="Assets/Images<?=$_SESSION['UserAvatar'];?>">
                </div>
                <div class="media-body">
                    <ul class="list-unstyled fa-ul">
                        <li style="color: #000;">
                            <i class="fa fa-user fa-li"></i><?=$_SESSION['UserName'];?>
                        </li>
                        <li style="color: #000;">
                            <i class="fa fa-envelope fa-li"></i><?=$_SESSION['UserMail'];?>
                        </li>
                        <li style="color: #000;">
                            <i class="fa fa-phone fa-li"></i><?=$_SESSION['UserPhoneNumber'];?>
                        </li>
                        <li style="color: #000; white-space: nowrap; text-overflow: ellipsis;">
                            <i class="fas fa-home fa-li"></i><?=$_SESSION['UserAddress'];?>
                        </li>
                    </ul>
                    <button class="btn btn-primary d-block float-left" type="button" id="UploadAvatarButton"
                            style="width: 120px;height: 40px;padding: 0;margin: 0 0 0 8px;">Upload Avatar
                    </button>
                    <button class="btn btn-primary d-block float-left" type="button" id="EditInfoButton"
                            style="width: 120px;height: 40px;padding: 0;margin: 0 0 0 8px;">Edit Info
                    </button>
                    <div class="clearfix"></div>
                    <a style="display: block; margin-left: 8px" href="?QPage=Login&Loss">Change Pass</a>
                </div>
            </div>
            <input id="UserForm" type="file" style="display: none">
            <div class="clearfix">
        </div>
    </div>
</div>
<div class="col-md-6" style="width: 60%;margin: 0 auto;padding: 15px;box-shadow: 3px 3px rgba(0, 0, 0, 0.25);display: none;" id="EditInfoForm">
    <form style="width: 100%;">
        <input value="<?=$_SESSION['UserName'];?>" class="border rounded-0 form-control" type="text" style="width: 100%;margin-bottom: 15px;" name="Name">
        <input value="<?=$_SESSION['UserMail'];?>" class="border rounded-0 form-control" type="text" style="width: 100%;margin-bottom: 15px;" name="Mail">
        <input value="<?=$_SESSION['UserAddress'];?>" class="border rounded-0 form-control" type="text" style="width: 100%;margin-bottom: 15px;" name="Address">
        <input value="<?=$_SESSION['UserPhoneNumber'];?>" class="border rounded-0 form-control" type="text" name="Phone" style="margin-bottom: 15px;width: 100%;">
        <button class="btn btn-primary" id="SaveUserInfo" type="button" style="width: 100%;background-color: #2ecc71;margin-left: 0;">
            Save
        </button>
    </form>
</div>
</div>
<div class="clearfix"></div>
<footer class="copyright" style="height: 80px;">
    <div class="content">
        Created With <i style="color: #e74c3c" class="fas fa-heart"></i> By Lê Minh Sơn &copy; 2020 <br>QGarden Owned By LMSQ Group &copy; 2020
    </div>
</footer>
<script src="Assets/JS/JQuery.js"></script>
<script src="Assets/Bootstrap/JS/Bootstrap.js"></script>

<script src="Assets/JS/DataTable.JQuery.js"></script>
<script src="Assets/JS/DataTable.Bootstrap.js"></script>

<script src="Assets/JS/QGarden.js"></script>
<script src="Assets/SweetAlert/SweetAlert.js"></script>
</body>

</html>
