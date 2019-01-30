<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
    header("Access-Control-Allow-Headers: *");
    header('Content-Type: text/html; charset=utf-8');
    header('P3P: CP="IDC DSP COR CURa ADMa OUR IND PHY ONL COM STA"');

    
        
    $accion = $_GET['accion'];
    //file_put_contents('accion.txt', print_r($accion,1));
    //$accion = $_POST['accion'];
    
    $h = "tantor.db.elephantsql.com";
    $u = "qaxjybpk";
    $p = "HazV2hg7txf1jULL1Io-owGCh6n509pd";
    $db= "qaxjybpk";
    $port="5432";
    $strCnx = "host=$h port=$port dbname=$db user=$u password=$p";
    $cnx = pg_connect($strCnx) or die ("Error de conexion. ". pg_last_error());

    switch ($accion) {
        case 'consulta':
            $carros = pg_query($cnx,'select * from cars') or die('fallo');
            $i=0;
            $cars=pg_fetch_all($carros);
            $status=200;
            break;
        case 'detalle':
            $id=$_GET['id'];
            $carro = pg_query($cnx,'select * from cars where id='.$id);
            $i=0;
            $cars='';
            foreach ($carro as $key => $value) {
                $cars[$i][$value] = $row;
                $i++;
            }
            $status = 200;
            break;
        case 'insertar':
            $id=$_GET['id'];
            $brand=$_GET['brand'];
            $model=$_GET['model'];
            $year=$_GET['year'];
            $madein=$_GET['madein'];
            $maxspeed=$_GET['maxspeed'];
            $sql="insert into cars (id,brand,model,year,made_in,max_speed)
                      VALUES($id,$brand,$model,$year,$madein,$maxspeed)";
            $carros = pg_query($cnx,$sql);
            $i=0;
            $status=200;
            $cars='';
            break;
        case 'modificar':
            $id=$_GET['id'];
            $brand=$_GET['brand'];
            $model=$_GET['model'];
            $year=$_GET['year'];
            $madein=$_GET['madein'];
            $maxspeed=$_GET['maxspeed'];
            $sql="update cars set brand=$brand,model=$model,year=$year,made_in=$madein,max_speed=$maxspeed where id=$id";
            $carros = pg_query($cnx,$sql);
            $cars='';
            $status=200;
            break;

        case 'eliminar':
            $id=$_GET['id'];
            $brand=$_GET['brand'];
            $model=$_GET['model'];
            $year=$_GET['year'];
            $madein=$_GET['madein'];
            $maxspeed=$_GET['maxspeed'];
            $sql="update cars set active=false where id=$id";
            $carros = pg_query($cnx,$sql);
            $cars='';
            $status=200;
            break;
    }

    $data = ['status' => $status, 'cars' => $cars];
   
    pg_close($cnx);
   
    echo json_encode($data);