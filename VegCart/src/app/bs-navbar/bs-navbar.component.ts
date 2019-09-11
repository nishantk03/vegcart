import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  appUser: AppUser;

  constructor(private auth: AuthService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
    //As we will have single instance of the component in DOM so no need to unsubscribe, 
    //As we are not unsubscribing so this subscription will be there for lifetime of application.
    //As we don't have multiple instance of this components so no chance of memory leak.
  }

  logout() {
    this.auth.logout();
  }

}
