<?php

class Api {

	public $_curl;
	const URL_API = 'http://api.hearthis.at/latroyon';

	public function __construct(){

		// Get cURL resource
		$this->_curl = curl_init();
		$this->setHeaders('application/json');
	}

	public function query() {
		echo $this->getData();
	}

	protected function getData($format = 'json'){
		// Set some options - we are passing in a useragent too here
		curl_setopt_array($this->_curl, array(
		    CURLOPT_RETURNTRANSFER => 1,
		    CURLOPT_URL => self::URL_API,
		));

		// Send the request & save response to $resp
		$resp = curl_exec($this->_curl);

		// Close request to clear up some resources
		curl_close($this->_curl);

		if($format != 'json' && $format == 'array') {
			$resp = json_decode($resp, true);
		}

		return $resp;
	}

	private function setHeaders($type){
		header("Content-Type:" . $type);
	}

}

?>