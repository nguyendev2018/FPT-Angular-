<?php
if (isset($_GET['Out']))
{
    $CartSession = $_SESSION['Cart'];

    session_destroy();

    session_start();

    $_SESSION['Cart'] = $CartSession;

    unset($CartSession);

    header('location: ?QPage=Home');
}

if ($_SESSION['Logged'] === 1 && !isset($_GET['Loss']))
{
    header('location: ?QPage=Home');
}

include_once 'View/Login.php';
