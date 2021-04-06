import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  moneyTransactions: any;
  constructor(
    public firebaseService: FirebaseService
  ) {
    this.firebaseService.get_transactions().subscribe((res) => {
      this.moneyTransactions = res.map(e => {
        // @ts-ignore
        return{
          id: e.payload.doc.id,
          // @ts-ignore
          type: e.payload.doc.data().type,
          // @ts-ignore
          title: e.payload.doc.data().title,
          // @ts-ignore
          subTitle: e.payload.doc.data().subTitle,
          // @ts-ignore
          amount: e.payload.doc.data().amount,
        };
      });
      console.log(this.moneyTransactions);
    }, (err: any) => {
      console.log(err);
    });
  }

  delete_transaction(id) {
    this.firebaseService.delete_transaction(id).then((res: any) => {
      console.log(res);
    });
  }

}
