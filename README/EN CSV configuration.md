# Setting up the CSV file

## Beware

- The inserted file **must be** in CSV format with tabs as the delimiter.
- The column with the header "barcode" is the only mandatory one. The othes are optional (**the "barcode" column must be the first one**)
- If a field is left empty in the CSV, the old value is deleted.
- The column headers must be among those listed below.
- The csv file cannot exceed 100 lines (excluding the header).

## Mapping table

| English Label           | CSV header's name            |
| ----------------------- | ---------------------------- |
| **Barcode (Mendatory)** | **barcode**                  |
| Break indicator         | break_indicator              |
| Chronology I            | chronology_i                 |
| Chronology J            | chronology_j                 |
| Chronology K            | chronology_k                 |
| Chronology L            | chronology_l                 |
| Chronology M            | chronology_m                 |
| Committed to Retain     | committed_to_retain          |
| Description             | description                  |
| Enumeration A           | enumeration_a                |
| Enumeration B           | enumeration_b                |
| Enumeration C           | enumeration_c                |
| Enumeration D           | enumeration_d                |
| Enumeration E           | enumeration_e                |
| Enumeration F           | enumeration_f                |
| Enumeration G           | enumeration_g                |
| Enumeration H           | enumeration_h                |
| Fulfillment note        | fulfillment_note             |
| Internal note 1         | internal_note_1              |
| Internal note 2         | internal_note_2              |
| Internal note 3         | internal_note_3              |
| Inventory number        | inventory_number             |
| Inventory price         | inventory_price              |
| Is magnetic             | is_magnetic                  |
| Issue date              | year_of_issue                |
| Item call number        | alternative_call_number      |
| Item policy             | policy                       |
| Item call number type   | alternative_call_number_type |
| Material type           | physical_material_type       |
| Pages                   | pages                        |
| Physical condition      | physical_condition           |
| Pieces                  | pieces                       |
| Provenance              | provenance                   |
| Public note             | public_note                  |
| Receiving operator      | receiving_operator           |
| Retention Note          | retention_note               |
| Retention Reason        | retention_reason             |
| Statistics note 1       | statistics_note_1            |
| Statistics note 2       | statistics_note_2            |
| Statistics note 3       | statistics_note_3            |
| Storage location ID     | storage_location_id          |
