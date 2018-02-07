<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Bdm extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->helper('url');
    }

    public function index()
    {
        $this->load->view('html/index.html');
    }

    public function career()
    {
        $data['lists'] = $this->region->lists();
        $data['industry'] = $this->industry->all_industry();
        $this->load->view('html/career.html',$data);
    }

    public function faq()
    {
        $this->load->view('html/faq.html');
    }

    public function region()
    {
        $lists = $this->region->lists();
        $response = [
            'code' => 200,
            'msg'  => '',
            'data' => $lists,
        ];
        header('Content-type: application/json');
        echo json_encode($response);
    }

    public function city()
    {
        $parent_code = $this->input->post('code');
        $lists = $this->region->citys($parent_code);
        $response = [
            'code' => 200,
            'msg'  => '',
            'data' => $lists,
        ];
        header('Content-type: application/json');
        echo json_encode($response);
    }

    public function industry()
    {
        $lists = $this->industry->all_industry();
        header('Content-type: application/json');
        $response = [
            'code' => 200,
            'msg'  => '',
            'data' => $lists,
        ];
        echo json_encode($response);
    }
}