<?php

include_once 'Model/Super.php';

$Users = new Super();

if (isset($_GET['Page'])) $CurrentPage = $_GET['Page']; else $CurrentPage = 1;

$Pagination = $Core ->Page($Users -> QSelectOneValue("SELECT COUNT(UserID) FROM Users"), $CurrentPage);

$UserList = $Users -> GetUser($CurrentPage);

include_once 'View/AdminUsers.php';

?>
