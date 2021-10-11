<?php
namespace App\Controller;

use App\Entity\Goods;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


use Symfony\Component\HttpFoundation\Response;

class IndexController extends AbstractController
{
    
    public function index(): Response
    {
        $goods = $this->getDoctrine()
            ->getRepository(Goods::class)
            ->findAll();

        return $this->render('index/index.html.twig', [
            'goods' => $goods,
        ]);
    }
}
