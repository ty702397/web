<?php
header("Content-Type:text/html;charset=utf-8");
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header('Content-Type:application/json; charset=utf-8');
/*file_put_contents('./img/tmp.log', '$_FILES'.":\n".print_r($_FILES, true)."\n\n", FILE_APPEND);
file_put_contents('./img/tmp.log', '$_POST'.":\n".print_r($_POST, true)."\n\n", FILE_APPEND);
file_put_contents('./img/tmp.log', '$_SERVER'.":\n".print_r($_SERVER, true)."\n\n", FILE_APPEND);*/
session_start();
date_default_timezone_set('Asia/Chongqing');
ini_set('display_errors', 1);
error_reporting(32767);





uploadfile();
	function uploadfile($path="img", $allowExt = array('png','jpg','jpeg','gif'), $maxSize=204800,$imgFlag=true){
	$name=$_POST['name'];
	$t=$_POST['date'];
	$d=strtotime(date($t));
    if (! file_exists($path)) {
        mkdir($path,0777,true);
    }
    $i = 0;
    $infoArr = buildInfo();
    foreach ($infoArr as $val) {
        if ($val['error'] === UPLOAD_ERR_OK) {
			$ext = getExt($val['name']);
			$today = date("YmdHi");
            $realName = getUniName($val['name'])."-".$today.".".$ext;
            $destination = $path."/".$realName;
            if(move_uploaded_file($val['tmp_name'], $destination)){
                $val['name'] = $realName;
                unset($val['error'],$val['tmp_name'],$val['size'],$val['type']);

                $uploadedFiles[$i]=$val;
                $i++;
				//$mes = "上传文件名: " . $realName. "<br>";
				//$mes = "文件存储在: " . "http://xy.ixinyou.com/ixy-topbar/".$destination;
				$mes = "http://xy.ixinyou.com/ixy-topbar/".$destination;
				$mes1 = "上传成功";
            }
			$info['status'] = 1;
			$info['content']=$mes1;
			$data['name']=$name;
			$data['date']=$d;
			$data['content'][$i]=$returnArr['data']=$mes;
				
        }else {
            $ext = getExt($val['name']);
            for($j=0;$j<count($allowExt);$j++){
                if($ext == $allowExt[$j]){
                    $m = "此文件适合上传标准";
                    $h = $m;
                }else {
                    $m = "此文件不可以被上传";
                }
            }
            if($h){
                $mes = "文件格式正确";
            }else{
                $mes = "文件格式错误";
                exit;
            }
            if($val['size']>$maxSize){
                $mes = "文件太大了";
                exit;
            }
            if($imgFlag){
                $result = getimagesize($val['tmp_name']);
                if(!$result){
                    $mes = "您上传的不是一个真正图片";
                    exit;
                }
            }
            if(!is_uploaded_file($val['tmp_name'])){
               $mes = "不是通过httppost传输的";
               exit;
            }
			$info['status'] = 2;
			$info['content']=$mes;
				
        }
    }
	print_r(json_encode_ex($info));
	$str=json_encode_ex($data);
	$file = "changeimg.json";
	if(false===file_exists($file)){
		//$msg = serialize($str);
		$fp = fopen($file,"w");
		fputs($fp,$str);
		fclose($fp);
	}else{
		file_put_contents($file,$str,FILE_APPEND);
	}
	
}

function getExt($fileName){
    $ext_tmp = explode('.',$fileName);
	return strtolower(end($ext_tmp));
    /**
     * strtolower() 函数把字符串转换为小写。
     * end()输出数组中最后一个元素的值
     * explode(),拆分字符串
     */
}
function getUniName($fileName){
	 return strtolower(current(explode('.',$fileName)));
}

function buildInfo(){
    $i = 0;
    foreach ($_FILES as $v){//三维数组转换成2维数组
        if(is_string($v['name'])){ //单文件上传
            $info[$i] = $v;
            $i++;
        }else{ // 多文件上传
            foreach ($v['name'] as $key=>$val){//2维数组转换成1维数组
                //取出一维数组的值，然后形成另一个数组
                //新的数组的结构为：info=>i=>('name','size'.....)
                $info[$i]['name'] = $v['name'][$key];
                $info[$i]['size'] = $v['size'][$key];
                $info[$i]['type'] = $v['type'][$key];
                $info[$i]['tmp_name'] = $v['tmp_name'][$key];
                $info[$i]['error'] = $v['error'][$key];
                $i++;
            }
        }
    }
    return $info;
}


 function json_encode_ex($array)
    {
        if(version_compare(PHP_VERSION,'5.4.0','<')){
            $str = json_encode($array);
            $str = preg_replace_callback("#\\\u([0-9a-f]{4})#i",function($matchs){
                 return iconv('UCS-2BE', 'UTF-8', pack('H4', $matchs[1]));
            },$str);
            return $str;
        }else{
            return json_encode($array, JSON_UNESCAPED_UNICODE);
        }
    }

?>
