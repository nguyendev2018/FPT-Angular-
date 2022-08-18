<?php

/** Provide function to working with Admin Dashboard. */
class Super extends User
{
    /** Get Admin Dashboard Info */
    public function GetDashboard()
    {
        if (!$this -> IsAdmin()) return false;

        $CurrentDate = new DateTime('now');
        $CurrentDate -> modify('last day of this month');

        $CurrentYear = date('Y');
        $CurrentMonth = date('M');
        $LastDay =$CurrentDate ->format('d');

        $StartTime = strtotime('01-'.$CurrentMonth.'-'.$CurrentYear.' 00:00:00');
        $EndTime = strtotime($LastDay.'-'.$CurrentMonth.'-'.$CurrentYear.' 23:59:59');

        $SQLBill = "SELECT COUNT(BillID) FROM Bill";
        $SQLProduct = "SELECT COUNT(ProductID) FROM Products";
        $SQLCategory = "SELECT COUNT(CategoryID) FROM Category";
        $SQLUser = "SELECT COUNT(UserID) FROM Users WHERE UserPermission != 0 AND UserPermission != 3";
        $SQLTotalCost = "SELECT SUM(BillTotalCost) FROM Bill WHERE BillCreateDate BETWEEN ? AND ?";

        $Dashboard = array();

        $Dashboard['Bill'] = $this -> QSelectOneValue($SQLBill);
        $Dashboard['User'] = $this -> QSelectOneValue($SQLUser);
        $Dashboard['Product'] = $this -> QSelectOneValue($SQLProduct);
        $Dashboard['Category'] = $this -> QSelectOneValue($SQLCategory);
        $Dashboard['Income'] = $this -> QSelectOneValue($SQLTotalCost, $StartTime, $EndTime);

        return $Dashboard;
    }

    /**
     * Edit an existing product.
     * @param int $ProductID
     * @param string|NULL $ProductName
     * @param string|NULL $ProductDecs
     * @param int|NULL $ProductPrice
     * @param int|NULL $ProductCategoryID
     * @param string|NULL $ProductImage
     * @param string|NULL $ProductDefaultImage
     * @return bool|string true if success. Error message if fail.
     */
    public function EditProduct(int $ProductID, string $ProductName = NULL, string $ProductDecs = NULL, int $ProductPrice = NULL, int $ProductCategoryID = NULL, string $ProductDefaultImage = NULL, string $ProductImage = NULL)
    {
        $SQL = "UPDATE Products SET ProductID = ?";

        if ($ProductName !== NULL) $SQL .= ", ProductName = '".$ProductName."'";
        if ($ProductDecs !== NULL) $SQL .= ", ProductDescription = ?";
        if ($ProductPrice !== NULL) $SQL .= ", ProductPrice = ".$ProductPrice;
        if ($ProductCategoryID !== NULL) $SQL .= ", ProductCategoryID = ".$ProductCategoryID;
        if ($ProductImage !== NULL) $SQL .= ", ProductImageList = '".$ProductImage."'";
        if ($ProductDefaultImage !== NULL) $SQL .= ", ProductDefaultImage = '".$ProductDefaultImage."'";

        $SQL .= " WHERE ProductID = ?";

        if ($ProductDecs !== NULL) return $this -> QExecute($SQL, $ProductID, $ProductDecs, $ProductID);
        else return $this -> QExecute($SQL, $ProductID, $ProductID);
    }

    /**
     * Add new product.
     * @param string $ProductName
     * @param string $ProductDecs
     * @param int $ProductPrice
     * @param int $ProductCategoryID
     * @param string $ProductImage
     * @param string $ProductDefaultImage
     * @return bool|string true if success. Error message if fail.
     */
    public function AddProduct(string $ProductName = NULL, string $ProductDecs = NULL, int $ProductPrice = NULL, int $ProductCategoryID = NULL, string $ProductDefaultImage = NULL, string $ProductImage = NULL)
    {
        $SQL = "INSERT INTO Products (ProductName, ProductDescription, ProductPrice, ProductCategoryID, ProductImageList, ProductDefaultImage) VALUE (?, ?, ?, ?, ?, ?)";

        return $this -> QExecute($SQL, $ProductName, $ProductDecs, $ProductPrice, $ProductCategoryID, $ProductImage, $ProductDefaultImage);
    }

    /**
     * Delete an existing product.
     * @param int $ProductID ID of product will be deleted.
     * @return bool|string true if success. Error message if fail.
     */
    public function DeleteProduct(int $ProductID)
    {
        return $this -> QExecute('SET FOREIGN_KEY_CHECKS = 0; DELETE FROM Products WHERE ProductID = ?;SET FOREIGN_KEY_CHECKS = 1;', $ProductID);
    }

    public function EditCategory(int $CategoryID, string $CategoryName)
    {
        $SQL = "UPDATE Category SET CategoryName = ? WHERE CategoryID = ?";

        return $this -> QExecute($SQL, $CategoryName, $CategoryID);
    }

    public function DeleteCategory(int $CategoryID, bool $Confirm = false)
    {
        if ($Confirm)
        {
            $this -> QExecute('SET FOREIGN_KEY_CHECKS = 0; DELETE FROM Products WHERE ProductCategoryID = ?;SET FOREIGN_KEY_CHECKS = 1;', $CategoryID);
            return $this -> QExecute('DELETE FROM Category WHERE CategoryID = ?', $CategoryID);
        } else return $this -> QExecute('DELETE FROM Category WHERE CategoryID = ?', $CategoryID);
    }

    public function AddCategory(string $CateName)
    {
        $SQL = "INSERT INTO Category (CategoryName) VALUE (?)";

        return $this -> QExecute($SQL, $CateName);
    }

    public function GetUser(int $CurrentPage = 1)
    {
        $SQL = "SELECT * FROM Users WHERE UserID != ?";

        $SQL .= " LIMIT ".(($CurrentPage - 1) * 12).", 12";

        return $this -> QSelect($SQL, $_SESSION['UserID']);
    }

    public function DeleteUser(int $UserID)
    {
        return $this -> QExecute("SET FOREIGN_KEY_CHECKS = 0;DELETE FROM Users WHERE UserID = ?;SET FOREIGN_KEY_CHECKS = 1;", $UserID);
    }
}
