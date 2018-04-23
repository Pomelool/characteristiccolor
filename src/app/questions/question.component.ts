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
    public stateVar = "infos";
    public info: object = {
        "name": "",
        "age": "",
        "gender": ""
    }
    public genders = [
        {
            "name": "男",
            "value": "m"
        },
        {
            "name": "女",
            "value": "f"
        }
    ]
    public choicePercentages: object = {
        "1": -1,
        "2": -0.8,
        "3": 0,
        "4": 0.8,
        "5": 1
    }

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

    public onSubmitInfo() {
        let result = this.dialogService.confirm('确定要提交此个人信息吗？', '取消', '确定');
        // if you need both answers
        result.subscribe(
            () => {
                this.resultE.infoObj = this.info;
                this.stateVar = "question";
            },
            (err: any) => {

            }
        );
    }

    public checkInfoValid(){
        if(
            this.info['name'] != null &&
            this.info['age'] != null &&
            this.info['gender'] != null &&
            this.info['name'].trim() != '' &&
            this.info['age'].trim() != '' &&
            this.info['gender'].trim() != '' &&
            this.info['age'].match(/[0-9]*(\.[0-9]+)?/)[0] == this.info['age'].match(/[0-9]*(\.[0-9]+)?/)['input']
        ){
            return false;
        }
        return true;
    }

    public previousQuestion() {
        this.currentIndex -= 1;
    }

    public nextQuestion() {
        this.currentIndex += 1;
    }

    public choose(tf: string) {
        let oldChoice = this.questionArr[this.currentIndex].result;
        if (tf != oldChoice) {
            for (let ind in this.scoreObj) {
                if(oldChoice != null){
                    this.scoreObj[ind] -= this.choicePercentages[oldChoice] * this.questionArr[this.currentIndex].scoreObj[ind];
                }
                this.scoreObj[ind] += this.choicePercentages[tf] * this.questionArr[this.currentIndex].scoreObj[ind];
                this.scoreObj[ind] = Math.round( this.scoreObj[ind] * 100 ) / 100;
            }
            this.questionArr[this.currentIndex].result = tf ;
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
        this.resultE.commentMsg = this.data[maxType];
        let choicesObj = {};
        for (let question of this.questionArr) {
            choicesObj[question.number] = question.result;
        }
        this.resultE.choicesObj = choicesObj;
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
        for (let qe of this.questionArr) {
            qe.result = null;
        }
        this.stateVar = 'question';
        this.resultE = new ResultEntity();
    }
}
