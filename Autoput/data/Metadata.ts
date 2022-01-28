export interface TaskDetails {
    name: string;
    type: "text" | "bool" | "image";
    value: string;
};

export interface TaskData {
    name: string;
    duedate: string;
    details: TaskDetails[];
};

export interface Tasks {
    tasks: TaskData[];
};
