<?php
require_once("api.php");
class Tracks extends Api {

	public function query()
	{
		echo json_encode($this->getData('array')['data']['tracks']);
	}

	public function get($param)
	{
		$tracks = $this->getData('array')['data']['tracks'];
		$track = null;

		foreach ($tracks as $k => $v) {			
			if($v['id'] == $param || $v['slush'] == $param) {
				$track = $v;
			}
		}

		if(is_null($track)) {
			echo 'no result';
		} else {
			echo json_encode($track);
		}
	}

}

$tracks = new Tracks();
if(isset($_GET['param']) && !empty($_GET['param'])) {
	$tracks->get($_GET['param']);
} else {
	$tracks->query();
}