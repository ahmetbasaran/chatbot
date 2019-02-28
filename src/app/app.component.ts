import { Component, OnInit } from '@angular/core';
import { NexbotService } from './services/nexbot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'nexbot';

  constructor(private nexBot: NexbotService) {
  }

  question = '';
  messageHistory: Array<any> = [];

  ngOnInit() {

  }


  sendMessage() {
    if (this.question.trim()) {
      this.nexBot.getAnswerBack(this.question).subscribe(res => {
        this.messageHistory.push({ text: this.question, sender: 'User', timestamp: Date.now() });
        this.messageHistory.push({ text: res.answers[0].answer, sender: 'Nexbot', timestamp: Date.now() });
        this.question = '';
      }, error => {
        console.log(error);
      },
        () => {
        });
    }
  }
}
