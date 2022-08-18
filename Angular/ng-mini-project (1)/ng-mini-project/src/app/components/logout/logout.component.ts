import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

	constructor(private router: Router, private authService: AuthenticateService) { }

	ngOnInit(): void {
		this.authService.currentUserSubject.next(null);
		this.router.navigate(['/home']);
	}

}
