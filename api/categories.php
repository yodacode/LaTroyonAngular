<?php
require_once("api.php");
class Categories extends Api {

	public function query()
	{
		$data = $this->getData('array')['data'];
		$categories = array();
		foreach($data as $k => $v){
			if (preg_match('/^category/', $k)) {
				$categories[] = $v;
			}
		}

		echo json_encode($categories);
	}
}

$categories = new Categories();
$categories->query();