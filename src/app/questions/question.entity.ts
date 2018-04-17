import { ScoreEntity } from "./score.entity";

export class QuestionEntity {
    public question: string;
    public number: number;
    public result: boolean;
    public scoreObj:ScoreEntity;

    constructor() {
        this.scoreObj = new ScoreEntity();
    }
}
