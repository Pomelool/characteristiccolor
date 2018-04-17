import { ResultEntity } from './result.entity';
import { ScoreEntity } from './score.entity';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataEntity } from './data.entity';
import { QuestionEntity } from './question.entity';
import { MdlDialogService } from '@angular-mdl/core';


@Component({
    selector: 'question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css']
})
export class QuestionComponent {
    public data: DataEntity = new DataEntity();
    public questionArr: QuestionEntity[] = [];
    public currentIndex: number = 0;
    public scoreObj: any = { 'blue': 0, 'green': 0, 'orange': 0, 'purple': 0, 'red': 0, 'yellow': 0 };
    //change this when data updates
    public fullScoreObj: any = { 'blue': 39, 'green': 58, 'orange': 67, 'purple': 64, 'red': 61, 'yellow': 58 };
    public resultE: ResultEntity = new ResultEntity();
    public stateVar = "question";

    constructor(
        private dialogService: MdlDialogService
    ) {
        const dataObj = JSON.parse(this.data.data);
        for (let ind in dataObj) {
            var obj = dataObj[ind];
            var qe = new QuestionEntity();
            qe.number = obj['id'];
            qe.question = obj['question']
            qe.result = null;
            qe.scoreObj.blue = obj['blue'];
            qe.scoreObj.red = obj['red'];
            qe.scoreObj.orange = obj['orange'];
            qe.scoreObj.yellow = obj['yellow'];
            qe.scoreObj.purple = obj['purple'];
            qe.scoreObj.green = obj['green'];
            this.questionArr.push(qe);
        }
    }

    public previousQuestion() {
        this.currentIndex -= 1;
    }

    public nextQuestion() {
        this.currentIndex += 1;
    }

    public choose(tf: boolean) {
        if (tf != this.questionArr[this.currentIndex].result) {
            for (let ind in this.scoreObj) {
                if (tf) {
                    this.scoreObj[ind] += this.questionArr[this.currentIndex].scoreObj[ind];
                }
                else {
                    this.scoreObj[ind] -= this.questionArr[this.currentIndex].scoreObj[ind];
                }
            }
            this.questionArr[this.currentIndex].result = tf;
        }
        if (this.currentIndex < this.questionArr.length - 1) {
            this.currentIndex += 1;
        }
    }

    public getResult() {
        let maxType = '';
        let maxPercentage = 0;
        for (let type in this.scoreObj) {
            let value = this.scoreObj[type] > 0 ? this.scoreObj[type] : 0;
            let percentage = Math.floor(value / this.fullScoreObj[type] * 100);
            if (percentage > maxPercentage) {
                maxPercentage = percentage;
                maxType = type;
            }
        }
        this.resultE.percentage = maxPercentage;
        this.resultE.type = maxType;
        this.resultE.result = this.data[maxType];
    }

    public submit() {
        let result = this.dialogService.confirm('确定要提交吗？', '取消', '确定');
        // if you need both answers
        result.subscribe(
            () => {
                this.stateVar = "result";
                this.getResult();
            },
            (err: any) => {

            }
        );
    }

    public reset() {
        this.currentIndex = 0;
        this.scoreObj = { 'blue': 0, 'green': 0, 'orange': 0, 'purple': 0, 'red': 0, 'yellow': 0 };
        for(let qe of this.questionArr){
            qe.result = null;
        }
        this.stateVar = 'question';
        this.resultE = new ResultEntity();
    }
}
