<?php

$CurrentPage = 1;

if (isset($_GET['Page'])) $CurrentPage = $_GET['Page'];

$TotalProduct = $Products -> GetTotalProduct();

$ProductList = $Products -> GetAllProduct($CurrentPage);

$Pagination = $Core -> Page($TotalProduct, $CurrentPage);

include_once 'View/AdminProduct.php';
