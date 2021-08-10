<?php

define('PATCH_APP','../app/');
define('PATCH_CONFIG','../config/');
define('PATCH_SRC','../src/');
define('PATCH_ROUTES','../routes/');
define('PATCH_VENDOR','../vendor/');
define('PATCH_VIEWS','../views/');


//server
$server = 'https://' . $_SERVER['HTTP_HOST']  . $_SERVER['PHP_SELF'];
putenv("HOST=$server");


//smtp
putenv("HOST_SMTP=smtp.gmail.com");
putenv("USER_SMTP=saknotifica@gmail.com");
putenv("PASS_SMTP=imcjxukknzioryol");

//bdd - postgresql
putenv("BDD_POSTGRE=postgres://wzmppztxxxdtmx:2718d5afd88377153df2debf15f61c59553bf86a6c031e81996b39f173ac9ee8@ec2-3-91-127-228.compute-1.amazonaws.com:5432/d3bjbjt5bph47j");
