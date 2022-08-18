<?php

if (isset($_GET['QPage']) and $_GET['QPage'])
{
    if (!isset($_GET['Bill']))
    {
        $TotalPrice = 0;
        $Cart = json_decode($_SESSION['Cart'], true);
    }
    else
    {
        include_once 'Model/Cart.php';

        $Bills = new Cart();
        $BillInfo = $Bills -> GetBillDetail($_GET['Bill']);

        $Loop = 0;

        $Cart = array();

        $Cart['ProductList'] = array();

        foreach ($BillInfo as $Bill)
        {
            $InForeachCurrentProductInfo = $Bills -> QSelect("SELECT * FROM Products WHERE ProductID = ?", $Bill['ProductID'])['0'];
            array_push($Cart['ProductList'], $InForeachCurrentProductInfo);

            $Cart['ProductList'][$Loop]['Qty'] = $Bill['ProductCount'];

            $Loop++;
        }
    }
    include_once 'View/Cart.php';
} else header('HTTP/1.0 403 Forbidden');
