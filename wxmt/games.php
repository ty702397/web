<?php


ini_set('error_reporting', 'E_ALL & ~E_NOTICE'); 



		$con=mysqli_connect('127.0.0.1','app_cms','V2VkLCAyMyBNYX','dedecms57sp2') or die("unable to connect to mysql!");
		mysqli_set_charset( $con,'utf8');
		$sql = "select t1.id, t2.icon,t1.title,t2.intro from dede_archives t1, dede_addon21 t2 where t1.id=t2.aid and t1.channel=21;";
		$result = mysqli_query($con,$sql);// or die("sql error:\n" . mysqli_errno($con)  . mysqli_error($con));
		if(mysqli_errno($con)===2013 or mysqli_errno($con)===2006){
			mysqli_close($con);
			$con=mysqli_connect('127.0.0.1','app_cms','V2VkLCAyMyBNYX','dedecms57sp2') or die("unable to connect to mysql!");
			$result = mysqli_query($con,$sql);
			
		}
		$data = array();
		while ($rows = mysqli_fetch_array($result,MYSQL_ASSOC)){
			// $count = count($rows);
			//  for($i=0;$i<$count;$i++){
			// 	unset($rows[$i]);//删除冗余数据
			
			// }
			
			array_push($data,$rows);
		}
		//close connection 
		mysqli_close($con);
		// foreach($data as $key=>$vaule){
		// 	$url=substr($data[$key]['typedir'],15).'/'.$data[$key]['id'].'.html';
		// 	unset($data[$key]['id']);
		// 	unset($data[$key]['typedir']);
		// 	$data[$key]['url']='http://'.$url;
			
		// }

	
		$jobj=new stdclass();//实例化stdclass，这是php内置的空类，可以用来传递数据，由于json_encode后的数据是以对象数组的形式存放的，
		//所以我们生成的时候也要把数据存储在对象中
		foreach($data as $key=>$value){
			$jobj->$key=$value;
			
		}
		
		$str=json_encode_ex($jobj);
		//$arr=json_decode($str);
		//print_r($str);
		//exit($str);
		$file = "/data/www/dedecms/uploads/sites/mserve.mitianvr.com/games.json";
		//$msg = serialize($str);
		$fp = fopen($file,"w");
		fputs($fp,$str);
		fclose($fp);
//	}				
//news_data();


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
