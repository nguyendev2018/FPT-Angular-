<?php
/** Start Session First */
session_start();
ini_set('display_errors', 'off');

if (!isset($_SESSION['Logged']))
{
    echo '<script>window.location.href = "index.php?QPage=Login"</script>';
}

/** Call Global Model */
include_once 'Model/DB.php';
include_once 'Model/Core.php';
include_once 'Model/User.php';
include_once 'Model/Super.php';
include_once 'Model/Products.php';

/** Set Global Variable */
$Products = new Products();
$Super = new Super();
$Core = new Core();


/** Check Admin */
if ($Super -> IsAdmin() == false)
{
    echo '<script>window.location.href = "index.php?QPage=Login"</script>';
}

/** Admin Navigation */
if (isset($_GET['QPage']))
{
    if (file_exists('Controller/'.$_GET['QPage'].'.php'))
    {
        include_once 'Controller/'.$_GET['QPage'].'.php';
    } else header('HTTP/1.0 403 Forbidden');
} else include_once 'Controller/Dashboard.php';
