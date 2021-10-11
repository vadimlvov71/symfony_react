<?php
// src/Service/Menu.php
namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Categories;
use App\Entity\Goods;

class Menu
{	
	public function __construct(EntityManagerInterface $em) {
        $this->em = $em;
    }
    
    public function getCategories()
    {
        $repoCategories = $this->em->getRepository(Categories::class);
        $categories = $repoCategories->createQueryBuilder('c')
		->select('c.id, COUNT(goods.id) as total, c.name, c.cat_translit')
		->leftJoin('c.goods', 'goods')
		->groupBy('c.id')
		->orderBy('total', 'DESC')
		->getQuery()
		->getResult()
		;
		return $categories;
    }
}
