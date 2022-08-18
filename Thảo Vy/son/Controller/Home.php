<?php

$CategoryID = 0;
$Search = '';

/** Get All Product With Product Per Page  Limit = 8 */
if (isset($_GET['Category'])) $CategoryID = $_GET['Category'];

if (isset($_GET['Search']))
{
    $Search = $_GET['Search'];

    $SearchQuery = "SELECT COUNT(*) FROM Products WHERE ";
        if ($CategoryID !== 0)
        {
            $SearchQuery .= "ProductCategoryID = '".$CategoryID."' AND ProductName LIKE '%".$Search."%'";
        } else $SearchQuery .= "ProductName LIKE '%".$Search."%'";

    $TotalProduct = $Products -> GetTotalProduct(0, $SearchQuery);
}

$ProductList = $Products -> GetAllProduct($CurrentPage, $CategoryID, $Search); //Get Product in specific category and search key.

$Pagination = $Core -> Page($TotalProduct, $CurrentPage);

include 'View/Home.php';

?>
