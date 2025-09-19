<?php
require_once "imports.php";

require_once dirname(__DIR__) . "/services/FacturacionUserSelectedService.php";

// include dirname(__DIR__) . "/utils/ParamInterceptor.php";

class FacturacionUserSelectedController
{
    public function __construct()
    {
        $response_code = new ResponseCodeCons();
        $sesionService = new SessionValidationService();
        switch ($_SERVER["REQUEST_METHOD"]) {
            case "GET":
                try {
                    
                        $service = new FacturacionUserSelectedService();
                        
                            $info_api = $service->data($_GET);
                           
                            $total=$service->obtenertotal($_GET);
                            $total_l=$total["total"];
                            $respond_data = new JsonEncode(200, $response_code->CODE_REQUEST(200), "Información cargada", $info_api,$total_l);
                            $respond_data->LoadJson();
                        
                       
                    
                } catch (BusinessException $e) {
                    ExceptionBuilderUtil::buildException($e, $response_code);
                }
                break;

            case "PUT":
                try {
                    $service = new FacturacionUserSelectedService();
                    $putData = json_decode(file_get_contents('php://input'), true);
                    $service->updateUser($putData);
                    $info_api = [];
                    $respond_data = new JsonEncode(200, $response_code->CODE_REQUEST(200), "Usuario actualizado", $info_api, 1);
                    $respond_data->LoadJson();
                    
                } catch (BusinessException $e) {
                    ExceptionBuilderUtil::buildException($e, $response_code);
                }
                break;

            case "DELETE":
                try {
                    $service = new FacturacionUserSelectedService();
                    $deleteData = json_decode(file_get_contents('php://input'), true);
                    $service->deleteUser($deleteData);
                    $info_api = [];
                    $respond_data = new JsonEncode(
                        200,
                        $response_code->CODE_REQUEST(200),
                        "Usuario eliminado",
                        $info_api,
                        1
                    );
                    $respond_data->LoadJson();
                } catch (BusinessException $e) {
                    ExceptionBuilderUtil::buildException($e, $response_code);
                }

                break;

            default:
                $info_api = [];
                $respond_data = new JsonEncode(405, $response_code->CODE_REQUEST(405), "Error General", $info_api,1);
                $respond_data->LoadJson();
                break;
        }
    }
}

new FacturacionUserSelectedController();
