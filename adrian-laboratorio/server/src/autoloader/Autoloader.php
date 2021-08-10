<?php

class Autoloader
{
    public static function regedit(){
        if(function_exists('__autoload')){
            spl_autoload_register('__autoload');
            return;
        }
        if(version_compare(PHP_VERSION, '5.3.0')>=0){
            spl_autoload_register(array('Autoloader','load'),true,true);
        }else{
            spl_autoload_register(array('Autoloader','load'));
        }
    }
    public static function load($class){
        $fileName = $class.'php';
        $folders  = require PATCH_CONFIG.'autoloader.php';

        foreach ($folders as $folder) {
            if(self::searchFile($folder, $fileName)){
                return true;
            }
        }
        return false;
    }
    private static function searchFile($folder,$fileName){
        $files = scandir($folder);
        foreach($files as $file){
            $directory = realpath($folder . DIRECTORY_SEPARATOR . $file);
            if(is_file($directory)){
                require_once $directory;
            }else if($file != '.' && $file != '..'){
                self::searchFile($directory, $fileName);
            }
        }
        return false;
    }
}