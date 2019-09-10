import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
 private _onDestroy: Subject<any> = new Subject();

  constructor(private auth:AuthService,
              private router:Router){
    auth.user$
    .pipe(takeUntil(this._onDestroy))
    .subscribe(user=>{
      if(user){
        let returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    });
  }

  ngOnDestroy(){
    this._onDestroy.unsubscribe();
  }
}
