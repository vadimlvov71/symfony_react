<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Query;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use App\Entity\Categories;
use App\Entity\Goods;
use App\Entity\Brands;
use App\Entity\Gallery;
 /**
* @Route("/api", name="app_react_ip")
 */
class ReactapiController extends AbstractController
{    
	public function __construct(EntityManagerInterface $em) {
        $this->em = $em;
    }
    /**
     * @Route("/user", name="users")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getUsers()
    {
        $users = [
            [
                'id' => 1,
                'name' => 'Olususi Oluyemi',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
                'imageURL' => 'https://randomuser.me/api/portraits/women/50.jpg'
            ],
            [
                'id' => 2,
                'name' => 'Camila Terry',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
                'imageURL' => 'https://randomuser.me/api/portraits/men/42.jpg'
            ],
            [
                'id' => 3,
                'name' => 'Joel Williamson',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
                'imageURL' => 'https://randomuser.me/api/portraits/women/67.jpg'
            ],
            [
                'id' => 4,
                'name' => 'Deann Payne',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
                'imageURL' => 'https://randomuser.me/api/portraits/women/50.jpg'
            ],
            [
                'id' => 5,
                'name' => 'Donald Perkins',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
                'imageURL' => 'https://randomuser.me/api/portraits/men/89.jpg'
            ]
        ];
    
        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(json_encode($users));
        
        return $response;
    }
    /**
     * @Route("/goods", name="goods")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
     public function getGoods(Request $request)
    {
		$cat = $request->get('cat');
		$brand = $request->get('brand');
        $page = 1;
        $step = 0;
        $itemPerPage = 6;
        /////
        $query = $this->em->createQueryBuilder();
		$query->select(array('g')) 
		   ->from('App\Entity\Goods', 'g')
		   //->orderBy('g.name', 'ASC')
		   ;
		if(isset($price)){
			$prices = explode("-", $price);
			$from_price = $prices[0];
			$to_price = $prices[1];
			   $query = $query->where('g.price BETWEEN :min AND :max')
				->setParameter('min', $from_price)
				->setParameter('max', $to_price)
				->getQuery();
		}elseif(isset($cat) && $cat != "none"){
			$query = $query->leftJoin('g.category', 'category')
				->where('category.cat_translit = :catTranslit')
				->setParameters(array(':catTranslit' => $cat))
				->getQuery();
		}elseif(isset($brand)){
			$query = $query->leftJoin('g.brand', 'brand')
			->where('brand.url = :brandTranslit')
			->setParameters(array(':brandTranslit' => $brand))
			->getQuery();
		}else{
            
           /* if($request->get('page')){
                $page =  $request->get('page');
                $page = $page - 1;
                $step = $itemPerPage * $page;
            }
			$query = $query->setFirstResult($step);
            $query = $query->setMaxResults($itemPerPage);
            */
            $query = $query->getQuery();
		}	
		//$query = $query->getQuery();
		$goods = $query->getResult(Query::HYDRATE_ARRAY);
		//////
        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(json_encode($goods));
        
        return $response;
    }
     
    /**
     * @Route("/categories", name="categories")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
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
    
        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(json_encode($categories));
        
        return $response;
    }
    /**
     * @Route("/brands", name="brands")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getBrands()
    {
		$query = $this->getDoctrine()
			->getRepository(Brands::class)
			->createQueryBuilder('b')
			->select('b.id', 'b.name', 'b.url')
			->getQuery();
		$brands = $query->getResult(Query::HYDRATE_ARRAY);
        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(json_encode($brands));
        
        return $response;
    }
     /**
     * @Route("/detail/{goods_translit}", name="detail")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getItem(Request $request): Response
    {
        $id = $request->get('id');
        $goods_translit =  $request->get('goods_translit');
        $query = $this->getDoctrine()
			->getRepository(Goods::class)
			->createQueryBuilder('g')
            ->where('g.goods_translit = :goodsTranslit')
            ->setParameters(array(':goodsTranslit' => $goods_translit))
			->getQuery();
            $good = $query->getSingleResult(Query::HYDRATE_ARRAY);
        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(json_encode($good));
        
        return $response;
    }
     /**
     * @Route("/gallery/{goods_id}", name="gallery")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getGallery(Request $request)
    {
        $goods_id = $request->get('goods_id');
		$query = $this->getDoctrine()
			->getRepository(Gallery::class)
			->createQueryBuilder('g')
            ->where('g.goods_id = :goodsId')
			->setParameters(array(':goodsId' => $goods_id))
			->getQuery();
		$gallery = $query->getResult(Query::HYDRATE_ARRAY);
        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(json_encode($gallery));
        
        return $response;
    }
}
