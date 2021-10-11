<?php
namespace App\Controller;

use App\Entity\Goods;
use App\Entity\Brands;
use App\Entity\Gallery;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\Query;
use App\Service\Helper;

class ReactController extends AbstractController
{
    public function __construct(EntityManagerInterface $em) {
        $this->em = $em;
    }
    public function index(Request $request): Response
    {
        /*enter to the site */
        return $this->render('react/index.html.twig');
    }
    /**
     * @Route("/{goods_translit}", name="goods_show", methods={"GET"})
     */
    public function detail(): Response
    {
		return $this->render('shop/react_detail.html.twig');
	}
     
}
