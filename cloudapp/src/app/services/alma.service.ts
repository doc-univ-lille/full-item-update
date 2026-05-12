import { Injectable } from '@angular/core';
import { CloudAppEventsService, CloudAppRestService } from '@exlibris/exl-cloudapp-angular-lib';
import { Item } from '../models/item.model';
import { forkJoin, lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlmaService {

  constructor(
    private restService: CloudAppRestService,
    private eventsService: CloudAppEventsService
  ) {}

  async getBarcode(barcode: string): Promise<Item> 
  {
    const obs = this.restService.call<Item>(`/items?item_barcode=${barcode}`)
    return (await lastValueFrom(obs));
  }

   /*
   getItemsFromBarcodeArray(barcodes: Array<string>):Promise<Array<Item>> {
    let items: Array<Item> = [];
    barcodes.forEach((barcode) => {
      this.getBarcode(barcode)
        .then((value:Item)=> items.push(value))
        .catch(() => console.log("AAAAAAA"))
    })
    return items
    */
   };

  /*
 getBarcode(barcode: string): Observable<Item> 
  {
    return this.restService.call<Item>(`/items?item_barcode=${barcode}`)
  }

   getItemsFromBarcodeArray(barcodes: Array<string>) {
    let observables: Observable<Item>[] = [];
    barcodes.forEach((barcode) => observables.push(this.getBarcode(barcode)));
    return forkJoin(observables)
    }
    */
    


  
