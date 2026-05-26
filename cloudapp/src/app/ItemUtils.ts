import { Item } from "./models/item.model";

export class ItemUtils {
    acceptedHeaders:Set<string>;
    headersWithDesc:Set<string>;

    constructor(){
        this.acceptedHeaders = new Set<string>([ "barcode" ,"policy" ,"provenance" ,"description" ,"location" ,"pages" ,"pieces" ,"physical_material_type" ,"po_line" ,"is_magnetic" ,"year_of_issue" ,"enumeration_a" ,"enumeration_b" ,"enumeration_c" ,"enumeration_d" ,"enumeration_e" ,"enumeration_f" ,"enumeration_g" ,"enumeration_h" ,"chronology_i" ,"chronology_j" ,"chronology_k" ,"chronology_l" ,"chronology_m" ,"break_indicator" ,"receiving_operator" ,"inventory_number" ,"inventory_price" ,"alternative_call_number" ,"alternative_call_number_type" ,"storage_location_id" ,"public_note" ,"fulfillment_note" ,"internal_note_1" ,"internal_note_2" ,"internal_note_3" ,"statistics_note_1" ,"statistics_note_2" ,"statistics_note_3" ,"physical_condition" ,"committed_to_retain" ,"retention_reason" ,"retention_note"]) 
        this.headersWithDesc = new Set<string>(["physical_material_type","policy","provenance","location","break_indicator","alternative_call_number_type","physical_condition","retention_reason"])
    }


    isInAcceptedHeaders(header:string):boolean{
        return this.acceptedHeaders.has(header)
    }


    modifItem(headerLabel:string,item:Item,value:string):Item{
        if( this.headersWithDesc.has(headerLabel)){
            item["item_data"][headerLabel as keyof Item["item_data"]]["value"]= value;
            return(item)
        } 
        item["item_data"][headerLabel as keyof Item["item_data"]] = value
        return(item)
    }

    
    getValueByHeaderLabel(headerLabel:string,item:Item):string{
        if( this.headersWithDesc.has(headerLabel)){
            return item["item_data"][headerLabel as keyof Item["item_data"]]["value"];
        } 
        return item["item_data"][headerLabel as keyof Item["item_data"]] 
    }
}
