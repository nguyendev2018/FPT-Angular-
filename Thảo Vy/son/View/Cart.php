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
                    <?php
                    if ($_SESSION['Logged'])
                    {
                        echo '<a class="btn btn-light action-button" role="presentation" href="?QPage=UserInfo" style="color: #fff;margin-bottom: 0;">'.$_SESSION['UserName'].'</a>';
                    }else echo '<a class="btn btn-light action-button" role="button" href="?QPage=Login" style="color: #fff;margin-bottom: 0;">Đăng Nhập</a>'; ?>
                    <i id="CartIcon" class="fas fa-shopping-cart d-xl-flex justify-content-xl-center align-items-xl-center" style="width: 32px;height: 32px;"></i>
                </div>
            </div>
        </nav>
    </div>
</div>
<div class="container" style="width: 80%;max-width: 90%;padding: 0;min-width: 0;margin: 0 auto;height: auto;">
    <h1 style="color: #000;width: 100%;margin: 15px auto;">Cart</h1>
    <div class="shopping-cart">
        <div class="table-responsive">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col" class="border-0 bg-light">
                        <div class="p-2 px-3 text-uppercase">Sản Phẩm</div>
                    </th>
                    <th scope="col" class="border-0 bg-light">
                        <div class="py-2 text-uppercase">Giá</div>
                    </th>
                    <th scope="col" class="border-0 bg-light">
                        <div class="py-2 text-uppercase">Số Lượng</div>
                    </th>
                    <th scope="col" class="border-0 bg-light">
                        <div class="py-2 text-uppercase">Xóa</div>
                    </th>
                </tr>
                </thead>
                <tbody>
                <?php
                foreach ($Cart['ProductList'] as $ProductID => $Qty)
                {
                    if (!isset($_GET['Bill']))
                    {
                        $ProductInfo = $Products -> GetProductInfo($ProductID);
                    } else $ProductInfo = $Products -> GetProductInfo($Qty['ProductID']);
                    $ProductImage = json_decode($ProductInfo['ProductImageList'], true)['0'];
                    $ProductCategoryName = $Core -> GetCategoryName($ProductInfo['ProductCategoryID']);

                    $TotalPrice = $TotalPrice + (int)($ProductInfo['ProductPrice'] * $Qty['Qty']);

                    echo
                    '
                    <tr class="CartTable">
                    <th scope="row" class="border-0">
                        <div class="p-2">
                            <img src="Assets/Images'.$ProductImage.'" alt="" width="70" class="img-fluid rounded shadow-sm">
                            <div class="ml-3 d-inline-block align-middle">
                                <h5 class="mb-0">
                                    <a href="?QPage=Product&ID='.$ProductID.'" class="text-dark d-inline-block align-middle">'.$ProductInfo['ProductName'].'</a>
                                </h5>
                                <span class="text-muted font-weight-normal font-italic d-block">Thuộc danh mục: '.$ProductCategoryName.'</span>
                            </div>
                        </div>
                    </th>
                    <td class="border-0 align-middle">
                        <strong>VND '.number_format($ProductInfo['ProductPrice'], 0, '.', '.').'</strong>
                    </td>
                    <td class="border-0 align-middle">
                        <strong>'.$Qty['Qty'].'</strong>
                    </td>
                    <td class="border-0 align-middle">
                        <a id="RemoveFromCartIcon" qg-data="'.$ProductID.'" class="text-dark">
                            <i class="fa fa-trash"></i>
                        </a>
                    </td>
                </tr>
                    ';
                }

                ?>
                <tr>
                    <td class="border-0 align-middle">
                        <strong>Tổng:</strong>
                    </td>
                    <td class="border-0 align-middle"></td>
                    <td class="border-0 align-middle"></td>
                    <td class="border-0 align-middle"><strong>VND <?=number_format($TotalPrice, 0, '', '.')?></strong></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <?php if(isset($_GET['Bill'])) Goto Footer; ?>
    <div class="col-md-6" style="width: 100%;height: auto;max-width: 100%;">
        <form id="CartInfo" style="width: 100%;max-width: 100%;">
            <input class="border rounded-0 form-control" name="Name" type="text" style="width: 60%;margin-bottom: 15px;" placeholder="Name">
            <input class="border rounded-0 form-control" name="Mail" type="email" style="width: 60%;margin-bottom: 15px;" placeholder="Email">
            <input class="border rounded-0 form-control" name="Address" type="text" style="width: 60%;margin-bottom: 15px;" placeholder="Address">
            <input class="border rounded-0 form-control" name="Phone" type="text" placeholder="Mobile number" style="margin-bottom: 15px;width: 60%;">
            <input type="hidden" name="Action" value="Checkout">
        </form>
    </div>
    <button id="CartCheckout" class="btn btn-primary float-right" type="button" style="width: 30%;background-color: #2ecc71;margin: 0px 0px 20px;">Checkout</button>
</div>
<?php Footer: ?>
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
