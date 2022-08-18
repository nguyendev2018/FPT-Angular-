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
                            <a class="nav-link" href="?QPage=AdminOrders" style="color: #fff;">Users</a>
                        </li>
                    </ul>
                    <form method="GET" action="?" class="form-inline mr-auto" target="_self"><input type="hidden" name="" value=""></form>
                    <?php
                    if (isset($_SESSION['Logged']) && $_SESSION['Logged'] === 1)
                    {
                        echo '<a class="btn btn-light action-button" role="presentation" href="?QPage=UserInfo" style="color: #ffffff;margin-bottom: 0;">' .$_SESSION['UserName']. '</a><a class="nav-link" style="color: #ffffff!important;" href="index.php?QPage=Login&Out">Logout</a>';
                    }
                    ?>
                </div>
            </div>
        </nav>
    </div>
</div>
<div class="container" style="width: 80%;max-width: 90%;padding: 0;min-width: 0;margin: 0 auto;">
    <h1 id="AdminProductHeader" style="color: #000;width: 100%;margin: 15px auto;">Users List</h1>
    <div class="shopping-cart">
        <div class="table-responsive">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col" class="border-0 bg-light">
                        <div class="p-2 px-3 text-uppercase">User ID</div>
                    </th>
                    <th scope="col" class="border-0 bg-light">
                        <div class="py-2 text-uppercase">Thôn Tin</div>
                    </th>
                    <th scope="col" class="border-0 bg-light">
                        <div class="py-2 text-uppercase">Xóa</div>
                    </th>
                </tr>
                </thead>
                <tbody>
                <?php
                foreach ($UserList as $User)
                {
                    echo
                        '
                    <tr class="CartTable">
                    <td class="border-0 align-middle">
                        <strong>#'.$User['UserID'].'</strong>
                    </td>
                    <th scope="row" class="border-0">
                        <div class="p-2">
                            <img src="Assets/Images'.$User['UserAvatar'].'" alt="" width="70" class="img-fluid rounded shadow-sm">
                            <div class="ml-3 d-inline-block align-middle">
                                <span class="text-muted font-weight-normal font-italic d-block">Tên Khách Hàng: '.$User['UserName'].'</span>
                                <span class="text-muted font-weight-normal font-italic d-block">SDT: '.$User['UserPhoneNumber'].'</span>
                                <span style="white-space: nowrap; text-overflow: ellipsis;" class="text-muted font-weight-normal font-italic d-block">Địa chỉ giao hàng: '.$User['UserAddress'].'</span>
                                <span class="text-muted font-weight-normal font-italic d-block">Email:  '.$User['UserMail'].'</span>
                            </div>
                        </div>
                    </th>
                    <td class="border-0 align-middle">
                        <a id="DeleteUser" qg-data="'.$User['UserID'].'" class="text-dark">
                            <i class="far fa-trash"></i>
                        </a>
                    </td>
                </tr>
                    ';
                }

                ?>
                </tbody>
            </table>
        </div>
    </div>
    <nav class="text-center">
        <ul class="pagination" style="margin: 20px auto 0;display: inline-block!important;">
            <?=$Pagination?>
        </ul>
    </nav>
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
