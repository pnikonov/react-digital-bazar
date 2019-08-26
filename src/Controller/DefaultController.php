<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    protected $authTestKey = 'fe1bae27cb7c1fb823f496f286e78f1d2ae87734';
    /**
     * @Route("/", name="main")
     */
    public function index()
    {
        return $this->render('default/index.html.twig', [
            'controller_name' => 'DefaultController',
        ]);
    }

    /**
     * @Route("/checkToken", name="checkToken")
     */
    public function checkToken(Request $request)
    {
        if ($request->headers->get('auth_token') != $this->authTestKey) {
            return $this->json(['errors' => ['auth_error']], 403);
        }

        return $this->json(['data' => ['auth_token' => $this->authTestKey]]);
    }

    /**
     * @Route("/auth", name="auth")
     */
    public function auth(Request $request)
    {
        $requestData = json_decode($request->getContent(), true);
        $errors = [];
        $data = [];
        if ($requestData['code'] == '12121212' && $requestData['phone'] == '71231231231') {
            $data = ['auth_token' => $this->authTestKey];
        } else {
            $errors[] = 'login error';
        }

        if (count($errors)) {
            return $this->json(['errors' => $errors], 403);
        }

        return $this->json(['data' => $data]);
    }

    /**
     * @Route("/products", name="products")
     */
    public function products(Request $request)
    {
        if ($request->headers->get('auth_token') != $this->authTestKey) {
            return $this->json(['errors' => ['auth_error']], 403);
        }

        $data = [
            'order' => '545656767',
            'items' => [
                [
                    'order' => '545656767',
                    'link' => '#dowload',
                    'name' =>'Название продукта может быть очень длинным'
                ],
                [
                    'order' => '545656767',
                    'link' => '#dowload',
                    'name' =>'очень длинное название'
                ],
                [
                    'order' => '545656767',
                    'link' => '#dowload',
                    'name' =>'Название продукта может быть очень длинным, в две строки, очень длинное название'
                ],
            ],
        ];

        return $this->json(['data' => $data]);
    }
}
