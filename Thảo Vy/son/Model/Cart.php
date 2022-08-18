<?php
 /** Call Mail Lib **/
include_once 'SendGrid/SendGrid.php';

/**
 * Class Cart provide function to working with cart and bills.
 */
class Cart extends DB
{
    private const MailToken = "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";

    public function GetProductPrice(int $ProductID)
    {
        $SQL = "SELECT ProductDiscount, ProductPrice FROM Products WHERE ProductID = ?";

        $Data = $this -> QSelectOneRecord($SQL, $ProductID);

        return (int)$Data['ProductPrice'];
    }

    public function AddBill(string $Address, string $Phone, string $UserMail, string $TotalCost, string $IUserName = NULL)
    {
        $BillID = (int)$this -> GetCurrentBillID() + 1;

        if ($_SESSION['UserID'] and $_SESSION['Logged'] === 1) $UserID = $_SESSION['UserID']; else $UserID = NULL;

        $Mailer = new SendGrid\Mail\Mail();

        try
        {
            $Mailer -> setFrom('support.qgarden@lmsq.vn', 'QGarden');
        }
        catch (Exception $Error)
        {
            return false;
        }

        if ($_SESSION['UserName']) $UserName = $_SESSION['UserName']; else $UserName = $IUserName;

        $Mailer -> addTo($UserMail, $UserName);
        $Mailer -> setSubject("Hóa đơn đã được tạo.");

        $Mailer -> addDynamicTemplateData('UserName', $UserName);
        $Mailer -> addDynamicTemplateData('BillID', $BillID);
        $Mailer -> setTemplateId('d-ba6d40732dd54d0981795b7fcc1ab09c');

        $Sender = new \SendGrid(self::MailToken);

        try
        {
            $Sender -> send($Mailer);
        }
        catch (Exception $Error)
        {
            return false;
        }

        $SQL = "INSERT INTO Bill SET BillID = ?, BillOfUserID = ?, UserShippingAddress = ?, UserPhoneNumber = ?, UserMail = ?, BillStatus = 0, BillCreateDate = ?, BillTotalCost = ?";

        return ($this -> QExecute($SQL, $BillID, $UserID, $Address, $Phone, $UserMail, time(), $TotalCost))  ? $BillID : false;
    }

    public function AddBillDetail(int $BillID, int $ProductID, int $ProductCount)
    {
        $SQL = "INSERT INTO BillDetail (BillID, ProductID, ProductCount) VALUE (?, ?, ?)";

        return $this -> QExecute($SQL, $BillID, $ProductID, $ProductCount);
    }

    public function GetBill(bool $IsOnlyNotCompleted = true)
    {
        $BillStatus = 1;

        $SQL = "SELECT Bill.*, Users.UserName, Users.UserAvatar FROM Bill, Users WHERE BillStatus = ? OR BillOfUserID = UserID GROUP BY BillID";

        if ($IsOnlyNotCompleted)
        {
            $BillStatus = 0;
        }

        return $this -> QSelect($SQL, $BillStatus);
    }

    public function GetBillDetail(int $BillID)
    {
        $SQL = "SELECT * FROM BillDetail WHERE BillID = ? GROUP BY BillDetailID";
        return $this -> QSelect($SQL, $BillID);
    }

    private function GetCurrentBillID()
    {
        return (int)($this -> QSelectOneValue("SELECT MAX(BillID) FROM Bill"));
    }

    public function DeleteBill(int $BillID)
    {
        $this -> QExecute("DELETE FROM BillDetail WHERE BillID = ?", $BillID);
        return $this -> QExecute("DELETE FROM Bill WHERE BillID = ?", $BillID);
    }
}
