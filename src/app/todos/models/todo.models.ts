export class Todo {
    public id: number;
    public text: string;
    public complete: boolean;

    constructor(text: string) {
        this.id = Math.random();
        this.text = text;
        this.complete = false;
    }
}