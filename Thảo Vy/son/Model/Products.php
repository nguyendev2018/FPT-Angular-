<?php

/** Product Model. Provide Function To Working With Product.  */
class Products extends DB
{

    /**
     * Get Total product.
     * @param int $CategoryID Optional. ID of Category need to count total product.
     * @return int Number of total product.
     */
    public function GetTotalProduct(int $CategoryID = 0, string $UserSQL = '')
    {
        $SQL = "SELECT COUNT(*) FROM Products";

        if ($UserSQL !== '') {$SQL = $UserSQL; return $this -> QSelectOneValue($SQL);}

        if ($CategoryID !== 0)
        {
            $SQL .= " WHERE ProductCategoryID = ?";
            return (int) $this -> QSelectOneValue($SQL, $CategoryID);
        } else return (int) $this -> QSelectOneValue($SQL);
    }

    /**
     * Get list of products.
     * @param int $CurrentPage Current Page. Default 0.
     * @param int $CategoryID ID of Category. Default 0.
     * @return array|string Error message or list of products.
     */
    public function GetAllProduct(int $CurrentPage = 0, int $CategoryID = 0, string $Search = '')
    {
        $SQL = "SELECT ProductID, ProductName, ProductPrice, ProductDefaultImage, ProductImageList, ProductDescription, ProductCategoryID FROM Products WHERE ProductID != 0";
        if ($CategoryID !== 0)
        {
            $SQL .= " AND ProductCategoryID = ?";
        }

        if ($Search !== '')
        {
            $SQL .= " AND ProductName LIKE ?";
            $Search = "%".$Search."%";
        }

        if ($CurrentPage !== 0)
        {
            $SQL .= " GROUP BY ProductID LIMIT ".(($CurrentPage - 1) * 12).", 12";
        }

        if ($Search !== '' and $CategoryID === 0) return $this -> QSelect($SQL, $Search);

        if ($Search === '' and $CategoryID !== 0) return $this -> QSelect($SQL, $CategoryID);

        if ($CategoryID !== 0 and $Search !== '') return $this -> QSelect($SQL, $CategoryID, $Search);

        return $this -> QSelect($SQL);
    }

    public function GetProductInfo(int $ProductID)
    {
        $SQL = "SELECT ProductID, ProductName, ProductPrice, ProductDefaultImage, ProductImageList, ProductDescription, ProductCategoryID FROM Products WHERE ProductID = ?";

        return $this -> QSelectOneRecord($SQL, $ProductID);
    }
}
