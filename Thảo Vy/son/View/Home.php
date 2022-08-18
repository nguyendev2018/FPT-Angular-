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
<div class="container" style="width: 80%;max-width: 90%;padding: 0;min-width: 0px;margin: 0 auto;height: auto;">
    <?php
    if (isset($_GET['Category']))
    {
        echo '<h1 style="color: #000;width: 100%;margin: 15px auto;">Shop: ' .$Core -> GetCategoryName($_GET['Category']).'</h1>';
    } else echo '<h1 style="color: #000;width: 100%;margin: 15px auto;">Home</h1>';
    foreach ($ProductList as $Product)
    {
        $Images = json_decode($Product['ProductImageList'], true)['0'];
        echo
        '
        <div id="ProductContainer" qg-id="'.$Product['ProductID'].'" class="col-4 d-inline-block float-left" style="width: 24%;padding: 0;margin: 0 1% 0 0;">
            <img style="width: 100%;height: auto;max-height: 400px;object-fit: fill;" src="Assets/Images'.$Images.'">
            <p class="text-center" style="width: 100%;height: 24px;margin-top: 5px;margin-right: 13px;color: #000;font-family: \'Source Sans Pro\', sans-serif;margin-bottom: 15px;">'.$Product['ProductName'].'</p>
            <p class="text-right" style="color:red;width: 100%;height: 24px;margin-top: 5px;margin-right: 13px;font-family: \'Source Sans Pro\', sans-serif;margin-bottom: 15px;">VND '.number_format($Product['ProductPrice'], 0, '.', '.').'</p>
            <button class="btn btn-primary" type="button" style="width: 48%;margin-right: 2%;background-color: #3498db;margin-left: 0;">Chi Tiết</button>
            <button id="IndexButtonAddCart" qg-id="'.$Product['ProductID'].'" class="btn btn-primary" type="button" style="width: 48%;background-color: #2ecc71;margin-right: 0;margin-left: 0;">Mua Hàng</button>
        </div>
        ';
    }
    ?>
    <div class="clearfix"></div>
</div>
<div class="clearfix"></div>
<nav class="text-center">
    <ul class="pagination" style="margin: 0 auto;margin-top: 20px;display: inline-block!important;">
        <?=$Pagination?>
    </ul>
</nav>
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
