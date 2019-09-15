import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  private _onDestroy: Subject<any> = new Subject();

  constructor(private auth: AuthService,
    private router: Router,
    private userService: UserService) {
    auth.user$
      .pipe(takeUntil(this._onDestroy))
      .subscribe(user => {
        if (!user) return;

        userService.save(user);

        const returnUrl = localStorage.getItem('returnUrl');
       
        if (!returnUrl) return;

        localStorage.removeItem('returnUrl');
        router.navigateByUrl(returnUrl);
      });
  }

  ngOnDestroy() {
    this._onDestroy.unsubscribe();
  }
}
