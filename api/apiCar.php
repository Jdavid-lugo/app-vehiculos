<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
    header("Access-Control-Allow-Headers: *");
    header('Content-Type: text/html; charset=utf-8');
    header('P3P: CP="IDC DSP COR CURa ADMa OUR IND PHY ONL COM STA"');

    
    ini_set('display_errors', '0');

    $accion = $_GET['accion'] ==''?$_POST['accion']:$_GET['accion'];
    //file_put_contents('accion.txt', print_r($_GET,1));
    //$accion = $_POST['accion'];

    $h = "tantor.db.elephantsql.com";
    $u = "qaxjybpk";
    $p = "HazV2hg7txf1jULL1Io-owGCh6n509pd";
    $db= "qaxjybpk";
    $port="5432";
    $strCnx = "host=$h port=$port dbname=$db user=$u password=$p";
    $cnx = pg_connect($strCnx) or die ("Error de conexion. ". pg_last_error());
    $data =['status' => '502', 'cars' => ''];

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
            $brand=$_POST['Marca'];
            $model=$_POST['Modelo'];
            $year=$_POST['Fecha'];
            $madein=$_POST['Pais'];
            $maxspeed=$_POST['MaximaVelocidad'];
            $sql="insert into cars (brand,model,year,made_in,max_speed)
                VALUES('$brand','$model','$year','$madein',$maxspeed);";
            file_put_contents('accion.txt', print_r($sql,1));
            $carros = pg_query($cnx,$sql) or die(json_encode($data));
            $i=0;
            $status=200;
            $cars='';
            break;
        case 'modificar':
            $id=$_GET['id'];
            $brand=$_GET['Marca'];
            $model=$_GET['Modelo'];
            $year=$_GET['Fecha'];
            $madein=$_GET['Pais'];
            $maxspeed=$_GET['MaximaVelocidad'];
            $sql="update cars set brand='$brand',model='$model',year='$year',made_in='$madein',max_speed=$maxspeed where id=$id";
            $carros = pg_query($cnx,$sql) or die(json_encode($data));
            $cars='';
            $status=200;
            break;

        case 'eliminar':
            $id=$_GET['id'];
            $sql="update cars set active=false where id=$id";
            $carros = pg_query($cnx,$sql);
            $cars='';
            $status=200;
            break;
        case 'habilitar':
            $id=$_GET['id'];
            $sql="update cars set active=true where id=$id";
            $carros = pg_query($cnx,$sql);
            $cars='';
            $status=200;
            break;
    }

    $data = ['status' => $status, 'cars' => $cars];
   
    pg_close($cnx);
   
    echo json_encode($data);