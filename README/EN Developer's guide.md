# Technical documentation

## Main packages

- cloudapp.src.app.
  - main => Main component. Contains the majority of this cloud-app
  - models => Contains the Item's object representation.
  - services => Contains the classes and the methods making the API calls to Alma.
- cloudapp.src.i18n => contains the translation files

# Internal methods for each main file of the app

This documentation assumes that the reader knows Angular basics.

## Main component

_main.component.ts_

**Variables**

- Labels (:string)
  - ErrorLabel => Displayed in the html of the app when an error is raised
  - evaluatingLabel => Displayed in the html of the app when the process has started or when it has ended
- Booleans (:boolean)
  - hasEvaluationEnded => Is true if the process has ended
  - isAdmin => Is true if the user has the general administrator role.
  - needToStop => Is true if a blocking error is raised.
- files (:File[]) => Stores the CSV file inserted by the user.
- barcodeList (:string[]) => List of all the barcodes present in the CSV file inserted by the user.
- File preparation (:string)
  - csvString => Used to create the Backup file.
  - journal => Used to create the logs file.

**Methods**

- ngOnInit => Used for rights management.
- onFileChange => Called when a file is added to the cloud-app.
- load => Parses the CSV and starts the process.
- evaluateParsing => Used to evaluate the parsed CSV
- parsedCsvToMap => Takes the parsed CSV and returns a list of maps containing the header name as the key and the line's corresponding value as the value.
- findMapInMapList => Takes a barcode and a list of maps (representing the CSV data) and returns the corresponding map.
- downloadBackupFile => Used to download the backup file
- downloadLogsFile => Used to download the logs file
- resetApplication => Used to reset the application

## alma.service

**Methods**

- getBarcode => Used to find an Item by its barcode.
- buildItemLink => Takes an Item and builds its link
- updateItem => Takes an item and updates it.
- updateArrayOfItems => Takes a list of items and updates them

## ItemUtils.ts

**Variables**

- acceptedHeaders (:Set< string >) => The list of accepted header values
- headersWithDesc (:Set< string >) => The list of header values possessing a value and a desc field.

**Methods**

- isInAcceptedHeaders => returns true if the given header label exists in the list of accepted headers.
- modifItem => Updates an item with the given value and the given attribute name.
- getValueByHeaderLabel => Returns a given attribute value.
