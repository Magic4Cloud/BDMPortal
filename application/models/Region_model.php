<?php
class Region_model extends CI_Model
{
    protected $table = 'regions';
    protected $special = [1,2,9,22];
    public function lists($type=1)
    {
        $lists =$this->db->where('type',$type)->where_not_in('id',$this->special)->get($this->table)->result_array();
        return  $lists;
    }

    public function citys($parent_code)
    {
        $lists = $this->db->where('parent_code',$parent_code)->get($this->table)->result_array();
        return $lists;
    }
}