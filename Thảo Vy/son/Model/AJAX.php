<?php
ini_set('display_errors', 'off');
/** Relink Model For AJAX */
include_once 'DB.php';
include_once 'User.php';
include_once 'Cart.php';
include_once 'Super.php';
include_once 'Products.php';

session_start();

$Status = array();
$Cart = array();

if (isset($_SESSION['Cart']))
{
    $Cart = json_decode($_SESSION['Cart'], true);
}

switch ($_POST['Action'])
{
    case 'AddToCartFullInfo':
        $Cart['ProductList'][$_POST['ProductID']]['Qty'] = $_POST['Qty'];
        $Status['Status'] = 1;

        echo json_encode($Status);

        $_SESSION['Cart'] = json_encode($Cart);

        break;
    case 'RemoveFromCart':
        if (array_key_exists($_POST['ProductID'], $Cart['ProductList']))
        {
            unset($Cart['ProductList'][$_POST['ProductID']]);
            $Status['Status'] = 1;
            $_SESSION['Cart'] = json_encode($Cart);
        }
        else
        {
            $Status['Status'] = 0;
            $Status['Message'] = "Không tồn tại sản phầm này trong giỏ hàng của bạn.";
        }

        echo json_encode($Status);

        break;
    case 'Login':
        if (isset($_POST['DoLogin']) && $_POST['DoLogin'] == 1)
        {
            include_once 'User.php';

            $User = new User();
            $Status = array();

            if ($User -> CheckLogin($_POST['UserLogin'], $_POST['Password']))
            {
                $Status['Status'] = 1;
            }
            else
            {
                $Status['Status'] = 0;
                $Status['Message'] = 'Tài khoản hoặc mật khẩu không chính xác.';
            }
        }
        else
        {
            $Status = array();

            $Status['Status'] = 0;
            $Status['Message'] = 'Vui lòng nhập đầy đủ dữ liệu!';

        }

        echo json_encode($Status);
        break;
    case 'UpdateInfo':
        $FullNamePattern = '/[^\d]\s*/';
        $PhonePattern = '/^0[0-9]{9}$/';
        $MailPattern = '/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/';

        $Status = array();
        $Status['Status'] = 1;

        if (!preg_match($FullNamePattern, $_POST['Name'])) {$Status['Status'] = 0; $Status['Message'] .= 'Vui lòng kiểm tra lại họ tên.<br>';}
        if (!preg_match($PhonePattern, $_POST['Phone'])) {$Status['Status'] = 0; $Status['Message'] .= 'Vui lòng kiểm tra lại số điện thoại.<br>';}
        if (!preg_match($MailPattern, $_POST['Mail'])) {$Status['Status'] = 0; $Status['Message'] .= 'Vui lòng kiểm tra lại địa chỉ mail.<br>';}

        if ($Status['Status'] !== 0)
        {
            $User = new User();

            $Address = $_POST['Address'];
            $Phone = $_POST['Phone'];
            $Name = $_POST['Name'];
            $Mail = $_POST['Mail'];

            $User -> Update($Phone, $Mail, $Name, $Address, NULL);
        }

        echo json_encode($Status);

        break;
    case 'UpdateAvatar':

        $Status = array();

        if (move_uploaded_file($_FILES['Avatar']['tmp_name'],dirname(dirname(__FILE__)).'/Assets/Images/Avatars/'.$_FILES['Avatar']['name']) && $_FILES['Avatar']['size'] > 0)
        {
            $Status['Status'] = 1;

            $User = new User();

            $User -> Update(NULL, NULL, NULL, NULL, '/Avatars/'.$_FILES['Avatar']['name']);
        }
        else
        {
            $Status['Status'] = 0;

            $Status['Message'] = 'Có lỗi trong quá trình xử lí file.';
        }

        echo json_encode($Status);
        break;
    case 'DeleteProduct':

        $Super = new Super();

        $Status = array();

        $Status['Status'] = 1;

        if ($Super -> DeleteProduct($_POST['Product']) !== true)
        {
            $Status['Status'] = 0;
            $Status['Message'] = 'Có lỗi khi xóa sản phẩm.';
        }

        echo json_encode($Status);
        break;
    case 'AddNewProduct':
        $Super = new Super();

        $Status = array();
        $IsImagesHandled = true;

        $ImageList = array();

        $Status['Status'] = 1;
        $Status['Message'] = '';

        $Path = dirname(dirname(__FILE__)).'/Assets/Images/Products/';

        if (!move_uploaded_file($_FILES['DefaultImage']['tmp_name'], $Path.$_FILES['DefaultImage']['name']))
        {
            $Status['Status'] = 0;
            $Status['Message'] .= "Có lỗi trong quá trình xử lí ảnh chính.<br>";
        } else $DefaultImage = '/Products/'.$_FILES['DefaultImage']['name'];

        foreach ($_FILES['ImageList']['error'] as $CurrentKey => $UploadStatus)
        {
            if ($UploadStatus === 0)
            {
                if (!move_uploaded_file($_FILES['ImageList']['tmp_name'][$CurrentKey], $Path.$_FILES['ImageList']['name'][$CurrentKey]))
                {
                    $IsImagesHandled = false;
                } else $ImageList[] = '/Products/'.$_FILES['ImageList']['name'][$CurrentKey];
            }
            else
            {
                $Status['Status'] = 0;
                $Status['Message'] .= "Có lỗi trong quá trình upload ảnh phụ.<br>";
                break;
            }
        }

        if ($IsImagesHandled === false)
        {
            $Status['Status'] = 0;
            $Status['Message'] .= "Có lỗi trong quá trình xử lí ảnh phụ.<br>";
        }

        if ($Status['Status'] !== 0)
        {
            if (!($Super -> AddProduct($_POST['ProductName'], $_POST['ProductDescription'], $_POST['ProductPrice'], $_POST['ProductCategory'], $DefaultImage, json_encode($ImageList))))
            {
                $Status['Status'] = 0;
                $Status['Message'] .= "Có lỗi trong quá trình thêm.<br>";
            }
        }

        echo json_encode($Status);
        break;
    case 'UpdateProduct':
        $Super = new Super();

        $Status = array();
        $IsImagesHandled = true;

        $ImageList = array();

        $Status['Status'] = 1;
        $Status['Message'] = '';

        $Path = dirname(dirname(__FILE__)).'/Assets/Images/Products/';

        if (!move_uploaded_file($_FILES['DefaultImage']['tmp_name'], $Path.$_FILES['DefaultImage']['name']))
        {
            $Status['Status'] = 0;
            $Status['Message'] .= "Có lỗi trong quá trình xử lí ảnh chính.<br>";
        } else $DefaultImage = '/Products/'.$_FILES['DefaultImage']['name'];

        foreach ($_FILES['ImageList']['error'] as $CurrentKey => $UploadStatus)
        {
            if ($UploadStatus === 0)
            {
                if (!move_uploaded_file($_FILES['ImageList']['tmp_name'][$CurrentKey], $Path.$_FILES['ImageList']['name'][$CurrentKey]))
                {
                    $IsImagesHandled = false;
                } else $ImageList[] = '/Products/'.$_FILES['ImageList']['name'][$CurrentKey];
            }
            else
            {
                $Status['Status'] = 0;
                $Status['Message'] .= "Có lỗi trong quá trình upload ảnh phụ.<br>";
                break;
            }
        }

        if ($IsImagesHandled === false)
        {
            $Status['Status'] = 0;
            $Status['Message'] .= "Có lỗi trong quá trình xử lí ảnh phụ.<br>";
        }

        if ($Status['Status'] !== 0)
        {
            $ImageList = json_encode($ImageList);

            if (!($Super -> EditProduct($_POST['ProductID'], $_POST['ProductName'], $_POST['ProductDescription'], $_POST['ProductPrice'], $_POST['ProductCategory'], $DefaultImage, $ImageList)))
            {
                $Status['Status'] = 0;
                $Status['Message'] .= "Có lỗi trong quá trình thêm.<br>";
            }
        }

        echo json_encode($Status);
        break;
    case 'DeleteBill':
        $Cart = new Cart();

        $Status = array();

        $Status['Status'] = 1;
        $Status['Message'] = '';

        if (!$Cart -> DeleteBill($_POST['BillID']))
        {
            $Status['Status'] = 0;
            $Status['Message'] = 'Có lỗi trong quá trình xóa hóa đơn.';
        }

        echo json_encode($Status);
        break;
    case 'Checkout':
        $Cart = new Cart();

        $Status = array();

        $CartList = json_decode($_SESSION['Cart'], true);

        $Status['Status'] = 1;
        $Status['Message'] = '';

        $IsHandleBill = true;
        $IsHandleBillDetail = true;

        $TotalPrice = 0;

        foreach ($CartList['ProductList'] as $ProductID => $CartQty)
        {
            if (!is_numeric($Cart -> GetProductPrice($ProductID)))
            {
                $IsHandleBill = false;
                break;
            }

            $TotalPrice += ($Cart -> GetProductPrice($ProductID) * $CartQty['Qty']);
        }

        if (!$IsHandleBill)
        {
            $Status['Status'] = 0;
            $Status['Message'] = 'Có lổi trong quá trình xử lí hóa đơn.<br>';
        }
        else
        {
            $CurrentBillID = $Cart -> AddBill($_POST['Address'], $_POST['Phone'], $_POST['Mail'], $TotalPrice, $_POST['Name']);

            foreach ($CartList['ProductList'] as $ProductID => $CartQty)
            {
                if (!$Cart -> AddBillDetail($CurrentBillID, $ProductID, $CartQty['Qty'])) $IsHandleBillDetail = false;
            }

            if (!$IsHandleBillDetail)
            {
                $Status['Status'] = 0;
                $Status['Message'] .= 'Có lỗi trong quá trình xử lí thông tin chi tiết đơn hàng.<br>';
            }
        }

        unset($_SESSION['Cart']);

        echo json_encode($Status);
        break;
    case 'EditCategory':
        $Super = new Super();

        $Status = array();

        $Status['Status'] = 1;
        $Status['Message'] = '';

        if (!$Super -> EditCategory($_POST['Category'], $_POST['CategoryName']))
        {
            $Status = 0;
            $Status['Message'] = "Có lỗi trong quá trình sửa danh mục.";
        }

        echo json_encode($Status);
        break;
    case 'DeleteCategory':
        $Super = new Super();

        $Status = array();

        $Status['Status'] = 1;
        $Status['Message'] = '';

        if (!$Super -> DeleteCategory($_POST['Category'], true))
        {
            $Status = 0;
            $Status['Message'] = "Có lỗi trong quá trình sửa danh mục.";
        }

        echo json_encode($Status);
        break;
    case 'AddNewCategory':
        $Super = new Super();

        $Status = array();

        $Status['Status'] = 1;
        $Status['Message'] = '';

        if (!$Super -> AddCategory($_POST['CategoryName']))
        {
            $Status = 0;
            $Status['Message'] = "Có lỗi trong quá trình sửa danh mục.";
        }

        echo json_encode($Status);
        break;

    case 'DeleteUser':
        $Super = new Super();

        $Status = array();

        $Status['Status'] = 1;
        $Status['Message'] = '';

        if ($Super -> DeleteUser($_POST['User']) != true)
        {
            $Status['Status'] = 0;
            $Status['Message'] = 'Xóa người dùng thất bại.';
        }

        echo json_encode($Status);
        break;
    case 'Loss':
        $Super = new Super();

        $Status = array();

        $Status['Status'] = 1;
        $Status['Message'] = '';

        if (true != $Super -> ChangePassword($_POST['CurrentPass'], $_POST['NewPass']))
        {
            $Status['Status'] = 0;
            $Status['Message'] = 'Đổi mật khẩu thất bại.';
        }

        echo json_encode($Status);
        break;
    case 'AddNew':
        $Super = new Super();

        $Status = array();

        $Status['Status'] = 1;
        $Status['Message'] = '';

        if (true != $Super -> Register($_POST['UserLogin'], $_POST['UserPass'], $_POST['UserName'], $_POST['UserMail'], $_POST['UserAddress'], $_POST['UserPhone']))
        {
            $Status['Status'] = 0;
            $Status['Message'] = 'Đăng ký người dùng thất bại.';
        }

        echo json_encode($Status);
        break;
    case 'ResendMail':
        include_once 'SendGrid/SendGrid.php';

        $Status = array();

        $Status['Status'] = 1;
        $Status['Message'] = '';

        $Mailer = new SendGrid\Mail\Mail();

        try
        {
            $Mailer -> setFrom('support.qgarden@lmsq.vn', 'QGarden');
        }
        catch (Exception $Error)
        {
            $Status['Status'] = 0;
            $Status['Message'] = 'Có lỗi trong quá trình xử lí nội bộ người gửi mail.';
        }

        $Mailer -> addTo($_POST['UserMail'], $_POST['UserName']);
        $Mailer -> setSubject("Hóa đơn đã được tạo.");

        $Mailer -> addDynamicTemplateData('UserName', $_POST['UserName']);
        $Mailer -> addDynamicTemplateData('BillID', $_POST['UserBillID']);
        $Mailer -> setTemplateId('d-ba6d40732dd54d0981795b7fcc1ab09c');

        $Sender = new \SendGrid('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');

        try
        {
            $Sender -> send($Mailer);
        }
        catch (Exception $Error)
        {
            $Status['Status'] = 0;
            $Status['Message'] = 'Có lỗi trong quá trình gửi mail.';
        }

        echo  json_encode($Status);
        break;
}
