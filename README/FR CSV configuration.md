# Paramétrage du fichier CSV

## Précautions à prendre

- Le fichier inséré doit obligatoirement être au format csv avec des tabulations comme séparateur.
- La colonne ayant pour en-tête “barcode” est la seule à être obligatoire le reste est facultatif (elle doit toujours être la première colonne).
- Si un champ est laissé vide pour un exemplaire, l'ancienne valeur est supprimée.
- Les colonnes de l'en-tête doivent faire partie de ceux présents dans cette liste
- Le nombre de ligne maximum du fichier (sans compter l'en-tête) est de 100.

## Tableau de correspondance

| Libellé français              | Nom du champ dans le fichier csv |
| ----------------------------- | -------------------------------- |
| **Code-barres (Obligatoire)** | **barcode**                      |
| Chronologie I                 | chronology_i                     |
| Chronologie J                 | chronology_j                     |
| Chronologie K                 | chronology_k                     |
| Chronologie L                 | chronology_l                     |
| Chronologie M                 | chronology_m                     |
| Cote d'exemplaire             | alternative_call_number          |
| Date de publication           | year_of_issue                    |
| Description                   | description                      |
| est magnétique                | is_magnetic                      |
| Engagement de conservation    | committed_to_retain              |
| État de conservation          | physical_condition               |
| Exception de circulation      | policy                           |
| ID Magasin distant            | storage_location_id              |
| Note de conservation          | retention_note                   |
| Note de services aux lecteurs | fulfillment_note                 |
| Note de statistiques 1        | statistics_note_1                |
| Note de statistiques 2        | statistics_note_2                |
| Note de statistiques 3        | statistics_note_3                |
| Note interne 1                | internal_note_1                  |
| Note interne 2                | internal_note_2                  |
| Note interne 3                | internal_note_3                  |
| Note publique                 | public_note                      |
| Numéro d'inventaire           | inventory_number                 |
| Numérotation A                | enumeration_a                    |
| Numérotation B                | enumeration_b                    |
| Numérotation C                | enumeration_c                    |
| Numérotation D                | enumeration_d                    |
| Numérotation E                | enumeration_e                    |
| Numérotation F                | enumeration_f                    |
| Numérotation G                | enumeration_g                    |
| Numérotation H                | enumeration_h                    |
| Opérateur de réception        | receiving_operator               |
| Pages                         | pages                            |
| Pièces                        | pieces                           |
| Prix de l'inventaire          | inventory_price                  |
| Provenance                    | provenance                       |
| Raison de conservation        | retention_reason                 |
| Type de cote d'exemplaire     | alternative_call_number_type     |
| Type de matériel              | physical_material_type           |
