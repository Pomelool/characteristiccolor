import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = '性格色彩测试';
  public userLoginApproved: boolean = false;

  public onLoginSuccess(urnm: string) {
    if (urnm == "user") {
      this.userLoginApproved = true;
    }
  }
}

