export class Examples {
    public static getJobs(): string {
        return '[{"id": "1", "name": "Explanation", "text": "Every day you need to check if all doors are closed.", "type": "0"}, {"id": "2", "name": "Front door", "text": "Closed?", "type": "1"}, {"id": "3", "name": "Front door", "text": "Please add a current image of that door", "type": "2"}, {"id": "13", "name": "testname", "text": "testtext", "type": "0"}]';
    }

    public static getTasks(): string {
        return '[{"date_recurrency": "2", "enddate": "2022-05-09 20:00:00", "id": "1", "name": "Task1", "startdate": "2022-03-30 17:45:00", "time_recurrency": "1"}, {"date_recurrency": "1", "enddate": "2022-05-30 03:45:00", "id": "4", "name": "Task3", "startdate": "2022-03-26 07:30:00", "time_recurrency": "1"}]';
    }

    public static getTask(): string {
        return '[{"date_recurrency": "2", "enddate": "2022-05-09 20:00:00", "id": "1", "name": "Task1", "startdate": "2022-03-30 17:45:00", "time_recurrency": "1"}]';
    }

    public static getTaskJobs(): string {
        return '[{"id": "1", "job_id": "1", "name": "Explanation", "task_id": "1"}, {"id": "2", "job_id": "2", "name": "Front door", "task_id": "1"}, {"id": "3", "job_id": "3", "name": "Front door", "task_id": "1"}]';
    }
}