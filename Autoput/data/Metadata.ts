export interface TaskDetails {
    name: string;
    type: "text" | "bool" | "image";
    text: string;
    value: string;
    checked: boolean;
};

export interface TaskData {
    name: string;
    duedate: string;
    details: TaskDetails[];
};

export interface Tasks {
    tasks: TaskData[];
};
