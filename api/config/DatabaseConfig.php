<?php

if (file_exists(__DIR__ . '/CoreConfig.local.php')) {
    require_once __DIR__ . '/CoreConfig.local.php';
} else {
    require_once __DIR__ . '/CoreConfig.example.php';
}

class DatabaseConfig
{

    private $hostname = HOST_BD;
    private $databaseUser = USER_BD;
    private $databaseUserPassword = PASS_BD;
    private $databaseName = DB_BD;
    private $databasePort = PORT_BD;
    private $dbh;
    private $error;
    private $stmt;

    private $bindParams = array();
    private $query;

    public function __construct()
    {

        $dsn = 'pgsql:host=' . $this->hostname . ';dbname=' . $this->databaseName . ';port=' . $this->databasePort;

        $options = array(
            PDO::ATTR_PERSISTENT => false,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        );

        try {

            $this->dbh = new PDO($dsn, $this->databaseUser, $this->databaseUserPassword, $options);

        } catch (PDOException $e) {

            $this->error = $e->getMessage();

        }

    }

    public function __destruct()
    {
        $this->dbh = null;
    }

    public function status()
    {

        $status = $this->dbh->getAttribute(PDO::ATTR_CONNECTION_STATUS);

        return $status;

    }

    public function query($query)
    {
        $this->query = $query;
        $this->stmt = $this->dbh->prepare($query);

    }

    public function bind($param, $value, $type = null)
    {

        if (is_null($type)) {

            switch (true) {
                case is_int($value):
 
                    $type = PDO::PARAM_INT;
                    break;
                case is_bool($value):

                    $type = PDO::PARAM_BOOL;
                    break;
                case is_null($value):

                    $type = PDO::PARAM_NULL;
                    break;

                default:

                    $type = PDO::PARAM_STR;

            }

        }

        $this->bindParams[$param] = $value;
        $this->stmt->bindValue($param, $value, $type);

    }

    public function execute()
    {

        return $this->stmt->execute();

    }

    public function resultSet()
    {

        $this->execute();
        return $this->stmt->fetchAll(PDO::FETCH_ASSOC);

    }

    public function single()
    {

        $this->execute();
        return $this->stmt->fetch(PDO::FETCH_ASSOC);

    }

    public function rowCount()
    {

        return $this->stmt->rowCount();

    }

    public function lastInsertId()
    {

        return $this->dbh->lastInsertId();

    }

    public function beginTransaction()
    {

        return $this->dbh->beginTransaction();

    }

    public function endTransaction()
    {

        return $this->dbh->commit();

    }

    public function cancelTransaction()
    {

        if ($this->dbh->inTransaction()) {
            return $this->dbh->rollBack();
        }
        
        return true;

    }

    public function debugDumpParams()
    {

        return $this->stmt->debugDumpParams();

    }

    public function errorInfo()
    {
        return $this->stmt->errorInfo();
    }

    public function getPreparedQuery()
    {
        return $this->stmt->queryString();
    }

    public function getFinalQuery()
    {
        return str_replace(array_keys($this->bindParams), array_values($this->bindParams), $this->query);
    }

}
