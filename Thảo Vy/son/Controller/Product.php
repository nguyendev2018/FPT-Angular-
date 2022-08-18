<?php

if (isset($_GET['ID']) and $_GET['QPage'] = 'Product')
{
    include_once 'View/Product.php';
} else header('HTTP/1.0 403 Forbidden');
