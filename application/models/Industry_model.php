<?php
class Industry_model extends CI_Model
{
    protected $table = 'industries';

    public function all_industry($type=1)
    {
        $lists = $this->db->where('type',$type)->get($this->table)->result_array();
        return $lists;
    }
}