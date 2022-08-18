<?php

/** Database Model. Working With QGarden Database */
class DB
{
    /**
     * The function return the connection from QFARM DB.
     * @return PDO|string false if error in DebugMode false,
     * Error message if false, PDO Object if connection Success.
     */
    private function ConnectToQGarden()
    {
        try
        {
            $ConnectionOption = array
            (
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'",
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            );
            $dbn = "mysql:host=localhost;dbname=mobileshop";
            $user="root";
            $password="";
            return new PDO ($dbn,$user,$password,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

        }
        catch (PDOException $Error)
        {
            return false;
        }
    }

    /**
     * The function use to execute INSERT, UPDATE, DELETE query to DB.
     * @param string $SQLQuery Execute the INSERT, UPDATE, DELETE query.
     * @return bool|string false if error in DebugMode false,
     * Error message if DebugMode true.
     */
    public function QExecute ($SQLQuery)
    {
        $SQLValue = array_slice(func_get_args(), 1);

        try
        {
            $Connection = self::ConnectToQGarden();

            $Query = $Connection -> prepare($SQLQuery);

            $Query -> execute($SQLValue);

            return true;
        }
        catch (PDOException $Error)
        {
            return $Error -> getMessage();
        }
        finally
        {
            unset($Connection);
        }
    }

    /**
     * Execute SQL SELECT Query.
     * @param string $SQLQuery SQL Query.
     * @return array|string DB data as array, false if error in DebugMode false,
     * Error message if DebugMode true.
     */
    public function QSelect ($SQLQuery)
    {
        $SQLValue = array_slice(func_get_args(), 1);

        try
        {
            $Connection = self::ConnectToQGarden();

            $Query = $Connection -> prepare($SQLQuery);
            $Query -> execute($SQLValue);

            return $Query -> fetchAll();
        }
        catch (PDOException $Error)
        {
            return $Error -> getMessage();
        }
        finally
        {
            unset($Connection);
        }
    }

    /**
     * Execute SQL SELECT Query for one row value.
     * @param string $SQLQuery SQL Query.
     * @return array|bool|string DB data, false if error in DebugMode false,
     * Error message if DebugMode true.
     */
    public function QSelectOneRecord ($SQLQuery)
    {
        $SQLValue = array_slice(func_get_args(), 1);

        try
        {
            $Connection = self::ConnectToQGarden();

            $Query = $Connection -> prepare($SQLQuery);
            $Query -> execute($SQLValue);

            return $Query -> fetch(PDO::FETCH_ASSOC);
        }
        catch (PDOException $Error)
        {
            return $Error -> getMessage();
        }
        finally
        {
            unset($Connection);
        }
    }

    /**
     * Execute SQL SELECT Query for one value. Usually use to check the exist of some type.
     * @param string $SQLQuery SQL Query.
     * @return array|string DB data, false if error in DebugMode false,
     * Error message if DebugMode true.
     */
    public function QSelectOneValue ($SQLQuery)
    {
        $SQLValue = array_slice(func_get_args(), 1);

        try
        {
            $Connection = self::ConnectToQGarden();

            $Query = $Connection -> prepare($SQLQuery);
            $Query -> execute($SQLValue);
            $Data = $Query -> fetch(PDO::FETCH_ASSOC);

            return array_values($Data)['0'];
        }
        catch (PDOException $Error)
        {
            return $Error -> getMessage();
        }
        finally
        {
            unset($Connection);
        }
    }
}
