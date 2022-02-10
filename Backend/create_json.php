<?php
/*
 * this script should run daily short after midnight to create a data.json out of database for daily tasks
 */

// database connection details
$server =   "---ADD HERE---";
$database = "---ADD HERE---";
$user =     "---ADD HERE---";
$password = "---ADD HERE---";

// create db connection
$db = new mysqli($server, $user, $password, $database);

// check db connection
if ($db->connect_error) {
  die("Connection failed: " . $db->connect_error . "\n");
}

include "classes.php";

// get all relevant tasks
$task_result = $db->query("SELECT * FROM task");

$json['tasks'] = array();

// foreach task
while($task = $task_result->fetch_assoc())
{
    $t = new Task();
    $t->name = $task['name'];
    $t->duedate = $task['duedate'];
    $t->jobs = array();

    // get all jobs of task
    $job_result = $db->query("SELECT * FROM job WHERE id in (SELECT job_id FROM task_job WHERE task_id = " . $task['id'] . ")");

    // foreach job
    while($job = $job_result->fetch_assoc())
    {
        $j = new Job();
        $j->name = $job['name'];
        $j->type = $job['type'];
        $j->text = $job['text'];

        $t->jobs[] = $j;
    }

    $json['tasks'][] = $t;
}

// save json
$fp = fopen('data.json', 'w');
fwrite($fp, json_encode($json));
fclose($fp);