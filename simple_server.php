<?php
date_default_timezone_set("Asia/Jerusalem");
$filename = "state.txt";
$method = $_REQUEST['action'];
$devicesState = json_decode(file_get_contents($filename), true);
if(!is_array($devicesState)) {
    $devicesState = [];
}

switch($method)
{
    case "set":
        $deviceName = trim(htmlspecialchars($_REQUEST['deviceName']));
        $state = trim(htmlspecialchars($_REQUEST['state']));
        $devicesState[$deviceName] = $state;
        file_put_contents($filename , json_encode($devicesState));
        print(json_encode($devicesState, JSON_PRETTY_PRINT));
        break;
    case "get":
        if(!is_array($devicesState)) {
            print("{}");
        } else {
            print(json_encode($devicesState, JSON_PRETTY_PRINT));
        }
        break;
    default:
        die("Unknown method");
        break;
}

?>