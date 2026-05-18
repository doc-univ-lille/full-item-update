export interface Item {
  item_data: {
    barcode: any;
    description: any;
    pid: any;
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
    alternative_call_number: any;
    physical_material_type : {
      value: any;
      desc: any;
    }
    policy : {
      value: any;
      desc: any;
    }
    library : {
      value: any;
      desc: any;
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