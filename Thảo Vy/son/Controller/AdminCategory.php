<?php

$CategoryList = $Core -> QSelect("SELECT * FROM Category");

include_once 'View/AdminCategory.php';
