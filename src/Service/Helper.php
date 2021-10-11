<?php
// src/Service/Helper.php
namespace App\Service;

class Helper
{	
    public function getPriceWithin()
    {
        $prices_choice = array("0-200" => "$0.00 - $200.00", "201-400" => "$201.00 - $400.00", "401-600" => "$401.00 - $600.00");
		return $prices_choice;
    }
}
