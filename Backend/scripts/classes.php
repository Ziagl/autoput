<?php

class Job{
    public $id;
    public $name;
    public $type;
    public $text;
}

class Task{
    public $id;
    public $name;
    public $duedate;
    public $enddate;
    public $date_recurrency;
    public $time_recurrency;
    public $jobs = array();
}

class Data{
    public $id;
    public $task_id;
    public $task_name;
    public $job_id;
    public $job_name;
    public $text;
    public $time;
    public $type;
    public $value;
}