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
                    <form class="form-inline mr-auto" target="_self">
                        <div class="form-group">
                            <label for="search-field">
                                <i class="fa fa-search" style="color: #fff;"></i>
                            </label>
                            <input class="form-control search-field" type="search" id="search-field" name="Search" placeholder="Bạn cần gì..." style="color: #fff;">
                        </div>
                    </form>
                    <i id="CartIcon" class="fas fa-shopping-cart d-xl-flex justify-content-xl-center align-items-xl-center" style="width: 32px;height: 32px;"></i>
                </div>
            </div>
        </nav>
    </div>
</div>

<?php
if (isset($_GET['New'])) goto NewUser;
if (isset($_GET['Loss']) && $_SESSION['Logged'] === 1) goto Loss; else header('location : ?QPage=Login');
?>

<div class="container" style="width: 80%;max-width: 90%;padding: 0;min-width: 0px;margin: 0 auto;height: auto;">
    <h1 style="color: #000;margin: 0 auto;width: 100%;margin-top: 15px;margin-bottom: 15px;">Login</h1>
</div>
<div class="login-clean" style="width: 100%;">
    <form method="POST" style="margin: 0 auto;padding: 45px;" id="Login" action="?QPage=Login">
        <h2 class="sr-only">Login</h2>
        <img src="Assets/Images/favicon.png" width="160px" height="160px" alt="Logo" style="width: 160px;height: 160px;margin: 0 auto;margin-bottom: 15px;margin-left: 40px;">
        <div class="form-group" style="margin: 0 auto 10px;">
            <input class="form-control" type="text" id="UserLogin" name="UserLogin" placeholder="Email or LoginID">
        </div>
        <div class="form-group" style="margin: 0 auto 10px;">
            <input class="form-control" type="password" id="Password" name="Password" placeholder="Password">
            <input type="hidden" name="DoLogin" value="1">
        </div>
        <div class="form-group">
            <button id="LoginButton" class="btn btn-primary btn-block" type="submit" style="margin-left: 0;margin-top: 0;">Log In</button>
            <a href="?QPage=Login&New" style="text-decoration: none;"><button id="BackToLogin" class="btn btn-primary btn-block" type="button" style="margin-left: 0;margin-top: 0;">Dont Be A User.?</button></a>
            <a href="?QPage=Login&Loss" style="width: 100%; text-align: center; display: inline-block;">Change Password</a>
        </div>
    </form>
    <?php goto End; ?>
    <?php NewUser: ?>
    <div class="login-clean" style="width: 100%;">
        <form method="POST" id="Login" style="margin: 0 auto;padding: 45px;" action="?QPage=Login">
            <h2 class="sr-only">Register</h2>
            <img src="Assets/Images/favicon.png" width="160px" height="160px" alt="Logo" style="width: 160px;height: 160px;margin: 0 auto;margin-bottom: 15px;margin-left: 40px;">
            <div class="form-group" style="margin: 0 auto 10px;">
                <input class="form-control" type="text" id="UserMail" name="UserMail" placeholder="Email">
            </div>
            <div class="form-group" style="margin: 0 auto 10px;">
                <input class="form-control" type="text" id="UserMail" name="UserAddress" placeholder="Address">
            </div>
            <div class="form-group" style="margin: 0 auto 10px;">
                <input class="form-control" type="text" id="UserLogin" name="UserLogin" placeholder="LoginID">
            </div>
            <div class="form-group" style="margin: 0 auto 10px;">
                <input class="form-control" type="text" id="UserPhone" maxlength="10" name="UserPhone" placeholder="Phone">
            </div>
            <div class="form-group" style="margin: 0 auto 10px;">
                <input class="form-control" type="text" id="UserName" name="UserName" placeholder="Name">
            </div>
            <div class="form-group" style="margin: 0 auto 10px;">
                <input class="form-control" type="password" id="Password" name="UserPass" placeholder="Password">
                <input type="hidden" name="Action" value="AddNew">
            </div>
            <div class="form-group">
                <button id="LoginAJAX" class="btn btn-primary btn-block" type="submit" style="margin-left: 0;margin-top: 0;">Register</button>
                <a href="?QPage=Login" style="text-decoration: none;"><button id="BackToLogin" class="btn btn-primary btn-block" style="margin-left: 0;margin-top: 0;">Already Have Account.?</button></a>
            </div>
        </form>
    </div>
    <?php goto End; ?>
    <?php Loss: ?>
    <div class="login-clean" style="width: 100%;">
        <form method="POST" id="Login" style="margin: 0 auto;padding: 45px;" action="?QPage=Login">
            <h2 class="sr-only">Register</h2>
            <img src="Assets/Images/favicon.png" width="160px" height="160px" alt="Logo" style="width: 160px;height: 160px;margin: 0 auto 15px 40px;">
            <div class="form-group" style="margin: 0 auto 10px;">
                <input class="form-control" type="text" id="UserLogin" name="CurrentPass" placeholder="Current Password">
            </div>
            <div class="form-group" style="margin: 0 auto 10px;">
                <input class="form-control" type="text" id="UserLogin" name="NewPass" placeholder="New Password">
            </div>
            <div class="form-group">
                <input type="hidden" name="Action" value="Loss">
                <button id="LoginAJAX" class="btn btn-primary btn-block" type="submit" style="margin-left: 0;margin-top: 0;">Change</button>
            </div>
        </form>
    </div>
    <?php End: ?>
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
