<?php

class Job{
    public $name;
    public $type;
    public $text;
}

class Task{
    public $name;
    public $duedate;
    public $jobs = array();
}