import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {AccountService} from './AccountService';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireFunctions} from '@angular/fire/functions';
import {AngularFirestore} from '@angular/fire/firestore';
import {HttpClient} from '@angular/common/http';
import {switchMap} from 'rxjs/operators';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {

  constructor(public accountService: AccountService, private  chRef: ChangeDetectorRef,
              public angularFireAuth: AngularFireAuth, private fns: AngularFireFunctions, angularFirestore: AngularFirestore,
              private http: HttpClient) {
  }

  test() {
    combineLatest([this.angularFireAuth.idToken, this.accountService.selectedNamespace$]).pipe(
      switchMap(([token, namespace]: [any, string]) => {
        return this.http.post('http://localhost:8080/test',{},{
          headers: {
            Authorization: `Bearer ${token}`,
            ns: namespace
          }
        })
      })
    )
      .subscribe();
  }
}
