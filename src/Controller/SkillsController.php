<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


class SkillsController extends AbstractController
{
    public function __construct() {
        //$this->em = $em;
    }
    public function ajaxform(Request $request): Response
    {
        /*enter to the site */
        return $this->render('skills/ajaxform.html.twig');
    }
   
    public function ajaxresponse(Request $request): Response
    {
        //$message = trim($_POST["message"]);
       // $message = array("hello", "hello", "yes", "world", "hello");
        //$message = "hello hello yes world hello";
        $message = $request->get('message');
        $pieces = explode(" ", $message);
       
        $result = array_count_values($pieces);
        
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(json_encode($result));
        
        return $response;
	}
     public function stop(Request $request): Response
    {
		echo "stop func";
		exit;
	}
}
