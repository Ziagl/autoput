<?php
class Database{
 
    // specify your own database credentials
    private $host =     "ziegelwanger-edv.at";
    private $db_name =  "d038dd1e";
    private $username = "d038dd1e";
    private $password = "8xYPRsvffzXxgtFs";
	private $port =     "3306";
    public $conn;
 
    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
 
        try{
		if($this->port){
            $this->conn = new PDO("mysql:host=" . $this->host . ";port=" . $this->port . ";dbname=" . $this->db_name, $this->username, $this->password);
            }else{
			$this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            
			}
			$this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>
