import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountComponent} from './account.component';
import {AccountService} from './AccountService';
import {AccountRoutes} from './account.routing';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// const prov = [];
// if (!environment.production) {
//   prov.push({provide: ORIGIN, useValue: 'http://localhost:5001'});
// }

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AccountRoutes),
    FormsModule,
    HttpClientModule
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
    // AngularFireStorageModule,
    // AngularFireFunctionsModule,
    // AngularFireAuthModule,
  ],
  declarations: [AccountComponent],
  exports: [AccountComponent],
  providers: [AccountService]
})
export class AccountModule {
}
