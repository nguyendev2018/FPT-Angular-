<?php

include_once 'Model/Cart.php';

$Cart = new Cart();

$BillList = $Cart -> GetBill();

include_once 'View/AdminOrders.php';

?>
