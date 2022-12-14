<!DOCTYPE html>
<html style="width: 100%;height: auto;">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>WEB3013 ASM</title>
    <script src="Assets/JS/JQuery.js"></script>
    <script src="Assets/Bootstrap/JS/Bootstrap.js"></script>
    <script src="Assets/SweetAlert/SweetAlert.js"></script>
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
                            <input class="form-control search-field" type="search" id="search-field" name="Search" placeholder="B???n c???n g??..." style="color: #fff;">
                        </div>
                    </form>
                    <?php
                    if ($_SESSION['Logged'])
                    {
                        echo '<a class="btn btn-light action-button" role="presentation" href="?QPage=UserInfo" style="color: #fff;margin-bottom: 0;">'.$_SESSION['UserName'].'</a>';
                    }else echo '<a class="btn btn-light action-button" role="button" href="?QPage=Login" style="color: #fff;margin-bottom: 0;">????ng Nh???p</a>';
                    ?>
                    <i id="CartIcon" class="fas fa-shopping-cart d-xl-flex justify-content-xl-center align-items-xl-center" style="width: 32px;height: 32px;"></i>
                </div>
            </div>
        </nav>
    </div>
</div>
<?php
$ProductInfo = $Products -> GetProductInfo($_GET['ID']);

$ProductImageList = json_decode($ProductInfo['ProductImageList'], true);

?>
<div class="container" style="width: 80%;max-width: 90%;padding: 0;min-width: 0;margin: 0 auto;height: auto;">
    <h1 style="color: #000;width: 100%;margin: 15px auto;">Product Detail</h1>
    <div class="col d-block float-left" style="width: 49%;height: auto;margin-right: 2%;padding: 0;">
        <img style="width: 100%;height: auto;object-fit: cover;margin-bottom: 10px;max-height: 400px;" id="ProductImageCurrentInView"
             src="Assets/Images<?=$ProductInfo['ProductDefaultImage'];?>">
        <div class="full-row">
            <?php foreach (json_decode($ProductInfo['ProductImageList'], true) as $Images) echo '<img id="ProductImageList" class="d-block float-left" style="width: 24%;height: auto;max-height: 100px;margin: 0 1.33% 0 0;object-fit: cover;" src="Assets/Images'.$Images.'">'; ?>
        </div>
        <div class="clearfix"></div>
    </div>
    <div class="col d-block float-left" style="width: 49%;height: auto;padding: 0;">
        <h3 style="width: 100%;height: auto;color: #000;margin-bottom: 15px;"><?=$ProductInfo['ProductName']?></h3>
        <h3 class="text-right" style="width: 100%;height: 34px;color: red;">VND <?=number_format($ProductInfo['ProductPrice'], 0, '.', '.')?></h3>
        <p class="text-left" style="color: #000;"><?=$ProductInfo['ProductDescription']?></p>
        <input id="ProductQty" class="d-block float-left" type="number" style="width: 40px;height: 48px;margin-right: 15px;padding-top: 0;padding-bottom: 0;padding-left: 12px;" name="Pty" value="1" min="1" max="10" step="1" required="">
        <button id="AddToCartFullInfo" class="btn btn-primary d-block float-left" type="button" style="width: 60%;height: 48px;">Th??m v??o gi??? h??ng</button>
    </div>
    <div class="clearfix"></div>
</div>
<footer class="copyright" style="height: 80px;">
    <div class="content"> Created With <i style="color: #e74c3c" class="fas fa-heart"></i> By L?? Minh S??n &copy; 2020 <br> QGarden Owned By LMSQ Group &copy; 2020
    </div>
</footer>
<script src="Assets/JS/DataTable.JQuery.js"></script>
<script src="Assets/JS/DataTable.Bootstrap.js"></script>

<script src="Assets/JS/QGarden.js"></script>
</body>

</html>
