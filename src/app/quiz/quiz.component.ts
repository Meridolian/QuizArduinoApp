import { Component, OnInit, OnDestroy } from '@angular/core';
import { Quiz } from '../models/quiz.model';
import { Subscription } from 'rxjs';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-quiz',
	templateUrl: './quiz.component.html',
	styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {

	questions: Quiz[];
	quizSubscription: Subscription;
	response: string;

	constructor(private quizService: QuizService, private router: Router) { }

	ngOnInit() {
		this.quizSubscription = this.quizService.quizSubject.subscribe(
			(question: Quiz[]) => {
				this.questions = question;
			}
		);
		this.quizService.sendQuiz();
	}

	onViewQuestion(id: number){
		this.router.navigate(['/quiz', '/view', id])
	}

	onGame(index, reponse: boolean) {
		if (this.questions[index].reponse === reponse){
			this.response = 'YOU WIN';
		}
		else {
			this.response = 'You failed';
		}
	}
	  
	ngOnDestroy(){
		this.quizSubscription.unsubscribe();
	}

}
