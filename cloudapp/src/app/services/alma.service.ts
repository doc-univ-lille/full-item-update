import { Injectable } from '@angular/core';
import { CloudAppRestService,Request as ExRequest, HttpMethod } from '@exlibris/exl-cloudapp-angular-lib';
import { Item } from '../models/item.model';
import { forkJoin, lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlmaService {

  constructor(
    private restService: CloudAppRestService,
  ) {}

  // Fonction permettant de récupérer un item grâce à son code-barres
  async getBarcode(barcode: string): Promise<Item> 
  {
    const obs = this.restService.call<Item>(`/items?item_barcode=${barcode}`)
    return (await lastValueFrom(obs));
  }

  //Fonction permettant de récupérer le lien vers un item
  buildItemLink(item: Item) {
      return `/bibs/${item.bib_data.mms_id}/holdings/${item.holding_data.holding_id}/items/${item.item_data.pid}`;

  }

  // Fonction permettant de mettre à jour un item
  updateItem(item: Item) {
    let req: ExRequest = {
      requestBody: item,
      url: this.buildItemLink(item),
      method: HttpMethod.PUT,
    };
    return this.restService.call<Item>(req);
  }

  // Fonction permettant de mettre à jour une liste d'items
  updateArrayOfItems(items: Item[]) {
    let observables:Observable<Item>[] = [];
    items.forEach((item) => observables.push(this.updateItem(item)));
    return forkJoin(observables);
  }


 
}

  
