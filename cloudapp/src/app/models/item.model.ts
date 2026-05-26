export interface Item {
  item_data: {
    barcode: any;
    description: any;
    pid: any;
    pages: any;
    pieces: any;
    is_magnetic: any;
    year_of_issue:any;
    enumeration_a: any;
    enumeration_b: any;
    enumeration_c: any;
    enumeration_d: any;
    enumeration_e: any;
    enumeration_f: any;
    enumeration_g: any;
    enumeration_h: any;
    chronology_i: any;
    chronology_j: any;
    chronology_k: any;
    chronology_l: any;
    chronology_m: any;
    receiving_operator: any;
    inventory_number: any;
    inventory_price: any;
    alternative_call_number: any;
    storage_location_id: any;
    public_note: any;
    fulfillment_note: any;
    internal_note_1: any;
    internal_note_2: any;
    internal_note_3: any;
    statistics_note_1: any;
    statistics_note_2: any;
    statistics_note_3: any;
    committed_to_retain: any;
    retention_note: any;
    physical_material_type : {
      value: any;
    }
    policy : {
      value: any;
    }
    provenance: {
      value: any;
    }
    location:{
      value:any;
    }
    break_indicator :{
      value: any;
      desc: any;
    }
    alternative_call_number_type: {
      value: any;
      desc: any;
    }
    physical_condition: {
      value:any;
      desc:any;
    }
    retention_reason: {
      value:any;
      desc:any;
    }
  };
  bib_data: {
    title: any;
    author: any;
    mms_id: any;
  };
  holding_data: {
    holding_id: any;
    temp_call_number: any;
    copy_id: any;
    in_temp_location : boolean;
    temp_library  : {
      value: any;
      desc: any;
    }
  };
  link: any;
}