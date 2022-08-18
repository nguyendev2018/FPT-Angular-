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

<body style="width: auto;color: #fff;">
<div>
    <div class="header-blue" style="height: 75px;padding: 0 0 0 0;">
        <nav class="navbar navbar-light navbar-expand-md navigation-clean-search">
            <div class="container-fluid">
                <a class="navbar-brand" href="Admin.php" style="width: auto;">QGarden Dashboard</a>
                <button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1" style="width: 100%;">
                    <span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span>
                </button>
                <div
                        class="collapse navbar-collapse" id="navcol-1" style="width: 100%;">
                    <ul class="nav navbar-nav" style="width: auto;">
                        <li class="nav-item" role="presentation" style="width: auto;">
                            <a class="nav-link" href="?QPage=Dashboard" style="color: #fff;">Dashboard</a>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav" style="width: auto;">
                        <li class="nav-item" role="presentation" style="width: auto;">
                            <a class="nav-link" href="?QPage=AdminProduct" style="color: #fff;">Products</a>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav" style="width: auto;">
                        <li class="nav-item" role="presentation" style="width: auto;">
                            <a class="nav-link" href="?QPage=AdminCategory" style="color: #fff;">Category</a>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav" style="width: auto;">
                        <li class="nav-item" role="presentation" style="width: auto;">
                            <a class="nav-link" href="?QPage=AdminOrders" style="color: #fff;">Orders</a>
                        </li>
                        <li class="nav-item" role="presentation" style="width: auto;">
                            <a class="nav-link" href="?QPage=AdminUsers" style="color: #fff;">Users</a>
                        </li>
                    </ul>
                    <form method="GET" action="?" class="form-inline mr-auto" target="_self"><input type="hidden" name="" value=""></form>
                    <?php
                    if (isset($_SESSION['Logged']) && $_SESSION['Logged'] === 1)
                    {
                        echo '<a class="btn btn-light action-button" role="presentation" href="?QPage=UserInfo" style="color: #fff;margin-bottom: 0;">'.$_SESSION['UserName'].'</a><a class="nav-link" style="color: #fff!important;" href="index.php?QPage=Login&Out">Logout</a>';
                    }
                    ?>
                </div>
            </div>
        </nav>
    </div>
</div>
<div class="container" style="width: 80%;max-width: 90%;padding: 0;min-width: 0;margin: 0 auto;">
    <h1 id="AdminProductHeader" style="color: #000;width: 100%;margin: 15px auto;">Category</h1>
    <?php if ($_GET['Category']) goto FormEdiProduct;  ?>
    <form id="AddNew" method="POST" enctype="multipart/form-data" style="padding: 0;width: 100%;<?php if(isset($_GET['Product'])) echo 'display: none;'; ?>">
        <div class="form-group d-block float-left" style="width: 100%; margin-right: 0;">
            <input class="form-control form-control-lg" type="text" style="width: 100%;" required name="CategoryName" placeholder="Product Name">
        </div>
        <div class="form-group" style="width: 100%;">
            <button id="DoAdd" class="btn btn-dark d-block float-left btn-lg" style="width: 32%;margin-right: 0;margin-left: 68%;background-color: rgb(39,174,96);" type="submit">Thêm Danh Mục</button>
            <input name="Action" value="AddNewCategory" type="hidden">
            <div class="clearfix"></div>
        </div>
    </form>

    <?php
    FormEdiProduct:
    if ($_GET['Category'])
    {
        $EditInfo = $Core -> QSelectOneRecord('SELECT * FROM Category WHERE CategoryID = ?', $_GET['Category']);

        echo
        '
        <form id="AddNew" method="POST" enctype="multipart/form-data" style="padding: 0;width: 100%;">
        <div class="form-group d-block float-left" style="width: 100%; margin-right: 0;">
        <input class="form-control form-control-lg" type="text" style="width: 100%;" required name="CategoryName" value="' . $EditInfo['CategoryName'] . '" placeholder="Product Name">
        </div>
        <div class="form-group" style="width: 100%;">
        <button id="DoAdd" class="btn btn-dark d-block float-left btn-lg" style="width: 32%;margin-right: 0;margin-left: 68%;background-color: rgb(39,174,96);" type="submit">Sửa Danh Mục</button>
        <input name="Category" type="hidden" value="' . $_GET['Category'] . '">
        <input name="Action" type="hidden" value="EditCategory">
        <div class="clearfix"></div>
        </div>
        </form>
        ';
    }
    ?>

    <div class="shopping-cart">
        <div class="table-responsive">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col" class="border-0 bg-light">
                        <div class="p-2 px-3 text-uppercase">#</div>
                    </th>
                    <th scope="col" class="border-0 bg-light">
                        <div class="py-2 text-uppercase">Tên Danh Mục</div>
                    </th>
                    <th scope="col" class="border-0 bg-light">
                        <div class="py-2 text-uppercase">Xóa</div>
                    </th>
                </tr>
                </thead>
                <tbody>
                <?php
                $Loop = 1;
                foreach ($CategoryList as $Category)
                {
                    echo
                        '
                    <tr class="CartTable">
                    <th scope="row" class="border-0">
                        <div class="p-2">
                            <div class="ml-3 d-inline-block align-middle">
                                <h5 class="mb-0">
                                    <a class="text-dark d-inline-block align-middle">'.$Loop.'</a>
                                </h5>
                            </div>
                        </div>
                    </th>
                    <td class="border-0 align-middle">
                        <strong>'.$Category['CategoryName'].'</strong>
                    </td>
                    <td class="border-0 align-middle">
                        <a id="DeleteCategory" qg-data="'.$Category['CategoryID'].'" class="text-dark">
                            <i class="far fa-trash"></i>
                        </a>
                        <a href="?'.http_build_query($_GET).'&Category='.$Category['CategoryID'].'" class="text-dark">
                            <i class="fal fa-edit"></i>
                        </a>
                    </td>
                </tr>
                    '; $Loop++;
                }

                ?>
                </tbody>
            </table>
        </div>
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
