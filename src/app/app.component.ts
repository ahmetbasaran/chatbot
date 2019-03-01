import { Component, OnInit } from '@angular/core';
import { NexbotService } from './services/nexbot.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('msgIn', [
      state('void', style({
        transform: 'scale(.01)'
      })),
      state('*', style({
        transform: 'scale(1)'
      })),
      transition('void=>*', animate('100ms'))
    ]),
  ]
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
      this.messageHistory.push({ text: this.question, sender: 'User', timestamp: Date.now() });
      this.nexBot.getAnswerBack(this.question).subscribe(res => {
        this.messageHistory.push({ text: res.answers[0].answer, sender: 'Nexbot', timestamp: Date.now() });
      }, error => {
        console.log(error);
      });
      this.question = '';
    }
  }
}
