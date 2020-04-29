import {AngularFireFunctions} from '@angular/fire/functions';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {map, mapTo, shareReplay, switchMap} from 'rxjs/operators';
import {ApplicationRef, Injectable, NgZone} from '@angular/core';
import {fromPromise} from 'rxjs/internal-compatibility';

@Injectable()
export class AccountService {
  // static getAccount$(user$, fns: AngularFireFunctions) {
  //   return user$.pipe(
  //     switchMap((user: firebase.User) => {
  //       if (user) {
  //         console.log('usr', user.toJSON());
  //         return fns.httpsCallable(CloudFunctionNames.LOGIN_SUCCESS_CF_NAME)(user.toJSON())
  //           .pipe(map((res: { success: boolean, data: { account: Account } }) => {
  //               if (res.success) {
  //                 return res.data.account;
  //               }
  //               return null;
  //             })
  //           );
  //       }
  //       return of(null);
  //     }),
  //     shareReplay(1),
  //     tap((value: any) => {
  //       console.log('AA', value)
  //     })
  //   );
  // }

  account$: Observable<Account>;

  private LOGIN_SUCCESS_CF_NAME = 'loginSuccess';
  selectedNamespace$: Observable<string>;

  constructor(private afs: AngularFirestore,
              private fns: AngularFireFunctions,
              public angularFireAuth: AngularFireAuth, ng: ApplicationRef) {
    this.account$ = angularFireAuth.user.pipe(
      switchMap((user: firebase.User) => {
        if (user) {
          return this.fns.httpsCallable(this.LOGIN_SUCCESS_CF_NAME)(user.toJSON())
            .pipe(switchMap((res: { success: boolean, forceTokenRefresh: boolean, data: { account: Account } }) => {
                if (res.success) {
                  //TODO fix-never return array
                  const acc = Array.isArray(res.data.account) ? res.data.account[0] : res.data.account;
                  if (res.forceTokenRefresh) {
                    return fromPromise(user.getIdToken(true)).pipe(mapTo(acc));
                  }
                  // looks like httpsCallable is not invoking angular change detection even with |async
                  this.detectChanges(ng);
                  return of(acc);
                }
                this.detectChanges(ng);
                return of(null);
              })
            );
        }
        this.detectChanges(ng);
        return of(null);
      }),
      shareReplay(1),
    );
    this.selectedNamespace$ = this.account$.pipe(map(a => a.namespace));
  }

  private detectChanges(ng: ApplicationRef) {
    setTimeout((value: any) => {
      ng.tick();
    });
  }
}

export class Account {
  name: string;
  email: string;
  imageUrl: string;
  ownerUid: string;
  createdAt: string;
  namespace: string;
}
