import { Injectable } from '@angular/core';
import { CloudAppEventsService, CloudAppRestService,Request as ExRequest, HttpMethod } from '@exlibris/exl-cloudapp-angular-lib';
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

  buildItemLink(item: Item) {
      return `/bibs/${item.bib_data.mms_id}/holdings/${item.holding_data.holding_id}/items/${item.item_data.pid}`;

  }

  updateItem(item: Item) {
    let req: ExRequest = {
      requestBody: item,
      url: this.buildItemLink(item),
      method: HttpMethod.PUT,
    };
    return this.restService.call<Item>(req);
  }
}

  
