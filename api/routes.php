<?php
require_once "./config/Connection.php";
require_once "./mainmodule/Get.php";
require_once "./mainmodule/Auth.php";
require_once "./mainmodule/Global.php";

$db = new Connection();
$pdo = $db->connect();
$global = new GlobalMethods($pdo);
$get = new Get($pdo);
$auth = new Auth($pdo);

if(isset($_REQUEST['request'])){
    $req = explode('/', rtrim($_REQUEST['request'], '/'));
}
else{
    $req = array("errorcatcher");
}

switch($_SERVER['REQUEST_METHOD']){
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        switch($req[0]){

            case 'tests':
                if(count($req)>1){
                    echo json_encode($get->get_common('tbl_tests', "name LIKE '$req[1]%'"));
                }
                else{
                    echo json_encode($get->get_common('tbl_tests'));
                } 
            break;

            case 'insert':
                echo json_encode($global->insert('tbl_tests', $data));
            break;

            case 'update':
                echo json_encode($global->update('tbl_tests', $data, NULL));
            break;
            
            case 'delete':
                if(count($req)>1){
                    echo json_encode($global->delete('tbl_tests', "id = '$req[1]'"));
                }
            break;
           
            default:
                echo "request not found";
            break;
        }
    break;
    case 'GET': 
        $data = json_decode(file_get_contents("php://input"));
        switch($req[0]){

            case 'tests':
                echo json_encode($get->get_common('tbl_tests'));
            break;

            default:
                echo "request not found";
            break;
        }
    break;

    default:
        echo "failed request";
    break;

    
}