import { ScoreEntity } from "./score.entity";

export class QuestionEntity {
    public question: string;
    public number: number;
    public result: string;
    public scoreObj:ScoreEntity;

    constructor() {
        this.scoreObj = new ScoreEntity();
    }
}
