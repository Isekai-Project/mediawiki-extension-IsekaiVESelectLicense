<?php
namespace Isekai\VESelectLicense;

use Skin;

class Hooks {
    public static function setConfig(array &$vars){
        global $wgIsekaiLicenses;
        $vars['wgIsekaiLicenses'] = $wgIsekaiLicenses;
        return true;
    }
}