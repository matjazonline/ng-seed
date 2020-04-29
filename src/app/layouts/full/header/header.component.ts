import { Component } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {auth} from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  photoURL$: Observable<string>;

  constructor(public angularFireAuth: AngularFireAuth, public router: Router) {
    this.photoURL$ = angularFireAuth.user.pipe(map(v => {
      return v ? v.photoURL : '/assets/images/noProfileImage.png';
    }));
  }

  signInWithGoogle() {
    this.angularFireAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }
}
