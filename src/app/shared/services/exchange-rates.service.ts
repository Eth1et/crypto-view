import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CryptoCurrency } from '../models/CryptoCurrency';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {

  collectionName: string = 'CryptoCurrencies';

  constructor(private afs: AngularFirestore) { }

  readByName(name: string): Observable<CryptoCurrency[]>{
    return this.afs.collection<CryptoCurrency>(this.collectionName, ref => ref.where('name','==',name).limit(1)).valueChanges();
  }

  getCryptocurrencyNames(): Observable<Array<string>>{
    return this.afs.collection<CryptoCurrency>(this.collectionName).valueChanges().pipe(
      map(docs => docs.map(doc => doc.name))
    );
  }

  addCryptocurrency(currency: CryptoCurrency): void{
    this.afs.collection<CryptoCurrency>(this.collectionName).doc(currency.abbreviation).set(currency);
  }
}
