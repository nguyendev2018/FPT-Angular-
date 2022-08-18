<?php
ini_set('display_errors', 'off');
/** Start Session First */
session_start();

/** Call Global Model */
include_once 'Model/DB.php';
include_once 'Model/Core.php';
include_once 'Model/Products.php';

/** Set Global Variable */
$CurrentPage = 1;
$Core = new Core();
$Products = new Products();

if (isset($_GET['Page']))
{
    $CurrentPage = $_GET['Page'];
}

if (isset($_GET['Category']))
{
    $TotalProduct =  $Products -> GetTotalProduct($_GET['Category']);
} else $TotalProduct = $Products -> GetTotalProduct();

$HeaderLink = $Core -> BuildHeaderLink();

/** Web Navigation */
if (isset($_GET['QPage']))
{
    if (file_exists('Controller/'.$_GET['QPage'].'.php'))
    {
        include_once 'Controller/'.$_GET['QPage'].'.php';
    } else header('HTTP/1.0 403 Forbidden');
} else include_once 'Controller/Home.php';

?>
