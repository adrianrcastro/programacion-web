<?php

require '../src/Roots.php';
require PATCH_SRC.'autoloader/Autoloader.php';
require PATCH_VENDOR . 'autoload.php';
Autoloader::regedit();

$dirs = scandir(PATCH_ROUTES);

foreach($dirs as $file){
    $filePatch = realpath(PATCH_ROUTES . $file);
    if(is_file($filePatch)){
        require $filePatch;
    }
}
Route::submit();