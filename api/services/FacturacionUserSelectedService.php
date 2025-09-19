<?php

require_once 'imports_of_services.php';

class FacturacionUserSelectedService
{
    private $database;
    private $data;
    private $idInternet;

    public function __construct()
    {
        $this->database = new DatabaseConfig();
    }

    public function data($data)
    {
        try {
            return $this->data_l($data);
        } catch (BusinessException $e) {
            $this->database->cancelTransaction();
            throw $e;
        }
    }

    private function data_l($data)
    {
        try {
            $page = $data['page'] ?? 1; // Valor predeterminado 1 si no se proporciona
            $limit = $data['limit'] ?? 10; // Valor predeterminado 10 si no se proporciona
            $start = ($page - 1) * $limit;
            // $user = $data['user'];
        
            $query = "SELECT user_name, firstnames, lastnames, email, mobilenumber FROM mosat.cliente_mosat WHERE statuscuenta='ACTIVO' AND user_name LIKE '%prue%' LIMIT :limit OFFSET :start;";
            $this->database->query($query);
            $this->database->bind(':limit', $limit);
            $this->database->bind(':start', $start);
            // $this->database->bind(':user', $user);
            return $this->database->resultSet();
        } catch (Exception $ex) {
            throw new BusinessException(500, $ex->getMessage());
        }
    }

    public function obtenertotal($data)
    {
        try {
            // $user = $data['user'];
            $queryv = "SELECT COUNT(*) OVER() AS total 
            FROM (
                SELECT user_name, firstnames, lastnames, email, mobilenumber FROM mosat.cliente_mosat WHERE statuscuenta='ACTIVO' AND user_name LIKE '%prue%'
            ) AS subquery;";
            $this->database->query($queryv);
            // $this->database->bind(':user', $user);
            return $this->database->single();
        } catch (Exception $ex) {
            throw new BusinessException(500, $ex->getMessage());
        }
    }


    public function updateUser($data)
    {
        try {
            $this->data = $data;
            $this->database->beginTransaction();
            $this->updateData();
            $this->database->endTransaction();
        } catch (BusinessException $e) {
            $this->database->cancelTransaction();
            throw $e;
        }
    }

    private function updateData()
    {
        $query = "UPDATE mosat.cliente_mosat SET firstnames=:firstnames, lastnames=:lastnames, email=:email, mobilenumber=:mobilenumber WHERE user_name=:user_name;";
        $this->database->query($query);
        $this->database->bind(':user_name', $this->data['user_name']);
        $this->database->bind(':firstnames', $this->data['firstnames']);
        $this->database->bind(':lastnames', $this->data['lastnames']);
        $this->database->bind(':email', $this->data['email']);
        $this->database->bind(':mobilenumber', $this->data['mobilenumber']);
        $this->database->execute();
    }


    public function deleteUser($data)
    {
        try {
            $this->data = $data;
            $this->database->beginTransaction();
            $this->deleteData();
            $this->database->endTransaction();
        } catch (BusinessException $e) {
            $this->database->cancelTransaction();
            throw $e;
        }
    }
    private function deleteData()
    {
        // $query = "DELETE FROM mosat.cliente_mosat WHERE user_name=:user_name;";

        $query = "UPDATE mosat.cliente_mosat SET statuscuenta='INACTIVO' WHERE user_name=:user_name;";
        $this->database->query($query);
        $this->database->bind(':user_name', $this->data['user_name']);
        $this->database->execute();
        $affected = $this->database->rowCount();
        if ($affected === 0) {
            throw new BusinessException(404, "No se encontró el usuario o ya está inactivo");
        }
    }

    private function validarDatos()
    {
        $requiredFields = ["idviaje", "estadov"];
        return ServiceUtils::validateRequiredFieldsAllowZero($this->data, $requiredFields);
    }

    public function getfilter($data)
    {
        $valueMatch = $data["user"];
        $valueMatch = trim($valueMatch);

        if ($valueMatch == "") {
            $addSqlFilter = "";
        } else {
            $addSqlFilter = "WHERE cliente = '$valueMatch'";
        }
        return $addSqlFilter;
    }

    public function data_l_f($data, $filter)
    {
        try {
            $page = $data['page'] ?? 1; // Valor predeterminado 1 si no se proporciona
            $limit = $data['limit'] ?? 10; // Valor predeterminado 10 si no se proporciona
            $start = ($page - 1) * $limit;
            $user = $data['user'];
            $queryv = "SELECT id,cliente,sis,vehiculo,plan_id,inicio_plan,fin_plan,estado,(SELECT tipoavl FROM mosat.mosat_vehiculo WHERE placa ILIKE  '%' || vehiculo || '%' limit 1),
            (SELECT pais FROM mosat.cliente_mosat WHERE user_name = cliente limit 1) as pais
            FROM mosat.control_estado_pagos " . $filter . " AND estado!='Transferencia'
            LIMIT :limit OFFSET :start";
            $this->database->query($queryv);
            $this->database->bind(':limit', $limit);
            $this->database->bind(':start', $start);

            return $this->database->resultSet();
        } catch (Exception $ex) {
            throw new BusinessException(500, $ex->getMessage());
        }
    }

    public function obtenertotal_f($data, $filter)
    {
        try {

            $page = $data['page'] ?? 1; // Valor predeterminado 1 si no se proporciona
            $limit = $data['limit'] ?? 10; // Valor predeterminado 10 si no se proporciona
            $start = ($page - 1) * $limit;
            $datos_add = "LIMIT " . $limit . " OFFSET " . $start . "";
            if ($page == 1)
                $datos_add = "";
            $queryv = "SELECT COUNT(*) OVER() AS total 
            FROM (
                SELECT id,cliente,sis,vehiculo,plan_id,inicio_plan,fin_plan,estado,(SELECT tipoavl FROM mosat.mosat_vehiculo WHERE placa =  vehiculo),
                (SELECT pais FROM mosat.cliente_mosat WHERE user_name = cliente) as pais
                FROM mosat.control_estado_pagos " . $filter . " AND estado!='Transferencia'
                " . $datos_add . "
            ) AS subquery;";
            $this->database->query($queryv);
            return $this->database->single();
        } catch (Exception $ex) {
            throw new BusinessException(500, $ex->getMessage());
        }
    }
}
