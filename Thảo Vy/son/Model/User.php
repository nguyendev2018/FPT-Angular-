<?php

/** Provide function to working with user. */
class User extends DB
{
    /**
     * Check the existence of some user.
     * @param string $EmailOrUserLoginID User-input Email or LoginID to check the existence.
     * @return bool true if Exist or fail.
     */
    public function IsExist (string $EmailOrUserLoginID)
    {
        if (filter_var($EmailOrUserLoginID, FILTER_VALIDATE_EMAIL))
        {
            $SQL = "SELECT UserMail FROM Users WHERE UserMail = ?";
        } else $SQL = "SELECT UserLogin FROM Users WHERE UserLogin = ?";

        return (count($this -> QSelectOneValue($SQL, $EmailOrUserLoginID)) > 0) ? true : false;
    }

    /**
     * check user-input password if match.
     * @param string $CurrentPass user-input current password.
     * @return bool true if match current password.
     */
    public function CheckCurrentPassword(string $CurrentPass)
    {
        $SQL = 'SELECT * FROM Users WHERE UserID = ?';

        $User = $this -> QSelectOneRecord($SQL, $_SESSION['UserID']);

        $UserInputPassword = self::Hasher($CurrentPass, $User['UserRegisterDate']);

        if (hash_equals($UserInputPassword, $User['UserPass'])) return true; else return false;
    }

    /**
     * Change user password.
     * @param string $NewPassword User-input new password.
     * @return bool|string Return true if success false if error. Error Message if DebugMode true.
     */
    public function ChangePassword(string $CurrentPass, string $NewPassword)
    {
        if (true != $this -> CheckCurrentPassword($CurrentPass))
        {
            return false;
        }

        $SQL = 'UPDATE Users SET UserPass = ? WHERE UserID = ?';

        return $this -> QExecute($SQL, self::Hasher($NewPassword, self::GetHash()), $_SESSION['UserID']);
    }

    /**
     * Create user login credential.
     * @param string $UserLoginID LoginID or user email.
     * @param string $UserLoginPassword User password.
     * @param bool $IsRemember If user want remember.
     * @return bool true if success and else if fail.
     */
    public function CheckLogin (string $UserLoginID, string $UserLoginPassword, bool $IsRemember = false)
    {
        if ($IsRemember) $_COOKIE['PortalID'] = session_id(); else unset($_COOKIE);

        if (filter_var($UserLoginID, FILTER_VALIDATE_EMAIL))
        {
            return self::LoginViaEmail($UserLoginID, $UserLoginPassword);
        }
        else
        {
            return self::LoginViaLoginID($UserLoginID, $UserLoginPassword);
        }
    }

    /**
     * Do login event via LoginID.
     * @param string $UserLoginID User mail.
     * @param string $UserLoginPassword User password.
     * @return bool|null true if match all. false if password not match and null if user not exist.
     */
    private function LoginViaLoginID(string $UserLoginID, string $UserLoginPassword)
    {
        $User = $this -> QSelectOneRecord("SELECT * FROM Users WHERE UserLogin = ? AND UserPermission != 0", $UserLoginID);

        if (NULL == $User) return null;

        $UserInputPassword = self::Hasher($UserLoginPassword, $User['UserRegisterDate']);

        if (hash_equals($UserInputPassword, $User['UserPass']))
        {
            $_SESSION['Logged'] = 1;
            $_SESSION['UserID'] = $User['UserID'];
            $_SESSION['UserName'] = $User['UserName'];
            $_SESSION['UserMail'] = $User['UserMail'];
            $_SESSION['UserLogin'] = $User['UserLogin'];
            $_SESSION['UserAvatar'] = $User['UserAvatar'];
            $_SESSION['UserAddress'] = $User['UserAddress'];
            $_SESSION['UserBirthday'] = $User['UserBirthday'];
            $_SESSION['UserPhoneNumber'] = $User['UserPhoneNumber'];


            return true;
        } else return false;
    }

    /**
     * Do login event via user email.
     * @param string $UserLoginID User mail.
     * @param string $UserLoginPassword User password.
     * @return bool|null reu if match all. false if password not match and null if user not exist.
     */
    private function LoginViaEmail(string $UserLoginID, string $UserLoginPassword)
    {
        $User = $this -> QSelectOneRecord("SELECT * FROM Users WHERE UserMail = ? AND UserPermission != 0", $UserLoginID);

        if (NULL === $User) return null;

        $UserInputPassword = self::Hasher($UserLoginPassword, $User['UserRegisterDate']);

        if (hash_equals($UserInputPassword, $User['UserPass']))
        {
            $_SESSION['Logged'] = 1;
            $_SESSION['UserID'] = $User['UserID'];
            $_SESSION['UserName'] = $User['UserName'];
            $_SESSION['UserMail'] = $User['UserMail'];
            $_SESSION['UserLogin'] = $User['UserLogin'];
            $_SESSION['UserAvatar'] = $User['UserAvatar'];
            $_SESSION['UserAddress'] = $User['UserAddress'];
            $_SESSION['UserBirthday'] = $User['UserBirthday'];
            $_SESSION['UserPhoneNumber'] = $User['UserPhoneNumber'];

            return true;
        } else return false;
    }

    /**
     * Hash function hash given string to Config Class configure.
     * @param string $String Given string need to hashed.
     * @param int $Key Hash Sign key.
     * @return string Hashed string.
     */
    public function Hasher(string $String, int $Key)
    {
        return hash_hmac('SHA3-256', $String, $Key);
    }

    /**
     * Get hash key from UserID.
     * @param string|null $UserLogin Get hash by Userlogin.
     * @return int User default hash key.
     */
    private function GetHash(string $UserLogin = NULL)
    {
        if ($UserLogin !== NULL)
        {
            return $this -> QSelectOneRecord('SELECT UserRegisterDate FROM Users WHERE UserLogin = ?', $UserLogin)['UserRegisterDate'];
        }
        return $this -> QSelectOneRecord('SELECT UserRegisterDate FROM Users WHERE UserID = ?', $_SESSION['UserID'])['UserRegisterDate'];
    }

    /**
     * Check if user is admin.
     * @return bool true if user is Admin.
     */
    public function IsAdmin()
    {
        if (empty($_SESSION['UserID'])) return false;

        if ($_SESSION['Logged'] !== 1) return false;

        if ($_SESSION['UserID'] and $_SESSION['Logged'] === 1) $UserID = $_SESSION['UserID']; else $UserID = NULL;
        $SQL = "SELECT UserPermission FROM Users WHERE UserID = ?";
        $UserPermission = $this -> QSelectOneValue($SQL, $UserID);

        return ((int)$UserPermission === 3 or (int)$UserPermission === 4) ? true : false;
    }

    /**
     * Get user display name from Mail or LoginID.
     * @param string $MailOrLoginID
     * @return string User Display name.
     */
    public function GetUserName(string $MailOrLoginID)
    {
        if (filter_var($MailOrLoginID, FILTER_VALIDATE_EMAIL))
        {
            return $this -> QSelectOneValue('SELECT UserName FROM Users WHERE UserMail = ?', $MailOrLoginID);
        } else return $this -> QSelectOneValue('SELECT UserName FROM Users WHERE UserLogin = ?', $MailOrLoginID);
    }

    /**
     * Get User Mail From LoginID.
     * @param string $LoginID LoginID of current user.
     * @return array|string User mail.
     */
    public function GetUserMail(string $LoginID)
    {
        if (filter_var($LoginID, FILTER_VALIDATE_EMAIL)) return $LoginID;
        return $this -> QSelectOneValue('SELECT UserMail FROM Users WHERE UserLogin = ?', $LoginID);
    }

    /**
     * Update User info.
     * @param string|NULL $UserPhone New User Phone.
     * @param string|NULL $UserMail New User Mail.
     * @param string|NULL $UserName New User Display Name.
     * @param string|NULL $UserAddress New User Address.
     * @param string|NULL $UserAvatar New User Avatar.
     * @return bool|string true if success. Error message when fail.
     */
    public function Update(string $UserPhone = NULL, string $UserMail = NULL, string $UserName = NULL, string $UserAddress = NULL, string $UserAvatar = NULL)
    {
        $SQL = "UPDATE Users SET";

        if ($UserPhone !== NULL)
        {
            $SQL .= " UserPhoneNumber = '".$UserPhone."',";
            $_SESSION['UserPhoneNumber'] = $UserPhone;
        }
        if ($UserMail !== NULL)
        {
            $SQL .= " UserMail = '".$UserMail."',";
            $_SESSION['UserMail'] = $UserMail;
        }
        if ($UserName !== NULL)
        {
            $SQL .= " UserName = '".$UserName."',";
            $_SESSION['UserName'] = $UserName;
        }
        if ($UserAddress !== NULL)
        {
            $SQL .= " UserAddress = '".$UserAddress."',";
            $_SESSION['UserAddress'] = $UserAddress;
        }
        if ($UserAvatar !== NULL)
        {
            $SQL .= " UserAvatar = '".$UserAvatar."',";
            $_SESSION['UserAvatar'] = $UserAvatar;
        }

        $SQL .= " UserID = ? WHERE UserID = ?";

        return $this -> QExecute($SQL, $_SESSION['UserID'], $_SESSION['UserID']);
    }

    public function Register(string $UserLogin, string $UserPass, string $UserName, string $UserMail, string $UserAddress, string $UserPhoneNumber)
    {
        $CurrentDate = time();
        $Mailer = new \SendGrid\Mail\Mail();

        try
        {
            $Mailer -> setFrom('support.qgarden@lmsq.vn', 'QGarden');
        }
        catch (Error $Error)
        {
            return false;
        }

        $Mailer -> addTo($UserMail, $UserName);
        $Mailer -> setSubject("QGarden - Kích hoạt tài khoản của bạn.");

        $Mailer -> addDynamicTemplateData('UserName', $UserName);
        $Mailer -> addDynamicTemplateData('UserLogin', $UserLogin);
        $Mailer -> setTemplateId('d-30fc47ea322d412db4453a0bf304b7c6');

        $Sender = new SendGrid('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');

        try
        {
            $Sender -> send($Mailer);
        }
        catch (Exception $Error)
        {
            return false;
        }

        $SQL = "INSERT INTO Users (UserLogin, UserPass, UserName, UserMail, UserAddress, UserPhoneNumber, UserRegisterDate, UserPermission) VALUE (?, ?, ?, ?, ?, ?, ?, ?)";

        return $this -> QExecute($SQL, $UserLogin, $this -> Hasher($UserPass, $CurrentDate), $UserName, $UserMail, $UserAddress, $UserPhoneNumber, $CurrentDate, 1);
    }
}
