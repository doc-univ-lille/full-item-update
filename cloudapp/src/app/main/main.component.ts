import { Component, OnDestroy, OnInit } from '@angular/core';
import { Papa, ParseResult, UnparseConfig } from 'ngx-papaparse';
import { Item } from '../models/item.model';
import { AlmaService } from '../services/alma.service';
import { HttpClient } from '@angular/common/http';
import { RestErrorResponse } from '@exlibris/exl-cloudapp-angular-lib';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
 isWrongFileTypeLabel:String;
 files:File[] = [];
 csvString :string = ""
 barcodeList: string[] = [];


  constructor(private papa: Papa, private almaService: AlmaService,private http: HttpClient){
    this.isWrongFileTypeLabel = "";
  }
 
  ngOnInit() {
    

  }

  ngOnDestroy(): void {
  }
  

  onFileChange(event:any ){
    const file:File = event.target.files[0];
      if (file) {
        if (file.type == "text/csv"){
          this.isWrongFileTypeLabel = "";
          this.files[0] = file;

          //TODO : externaliser le load par la suite pour l'appeler depuis un autre bouton
          this.load();


        }
            else{
              this.isWrongFileTypeLabel = "Veuillez entrer un fichier .csv";
            }
        }
    }


    // Parsing du fichier csv
    load(){
       this.papa.parse(this.files[0],{
          complete: (result) => {
            this.evaluateParsing(result)
          }})
    }

    // Traitement du fichier parsé
    async evaluateParsing( parsedFile:ParseResult){

      var itemList: Array<Item> = new Array()
      var csvMapList : Map<string,string>[] = this.parsedCsvToMap(parsedFile.data)
      var futurCsv : Array<Array<any>> = new Array();
      const header:string[] = parsedFile.data[0];

      // Ajout des noms des différentes colonnes dans le futur csv de backup
      futurCsv.push(header)

      for(let index= 0; index<csvMapList.length; index++){
        await this.almaService.getBarcode(csvMapList[index].get("barcode")!)
        .then((i:Item)=> itemList.push(i))
        .catch((err)=> {console.log(err); console.log(csvMapList[index].get("barcode"))});

    }

    itemList.forEach((item:Item) =>{
      let modifiedItem:Item = item;
      let csvData:Map<string,string> = this.findMapInMapList(modifiedItem.item_data.barcode, csvMapList);
      let futurCsvLine: Array<string> = []
      
      for(let index=1; index<header.length; index++){
        let headerLabel:string = header[index];
          futurCsvLine.push(<string>item["item_data"][headerLabel as keyof Item["item_data"]]);

          // /!\ Cette ligne est APRES l'insertion de la ligne de backup dans le futur csv
          item["item_data"][headerLabel as keyof Item["item_data"]] = csvData.get(headerLabel)!;
        
      }
      this.almaService.updateItem(item).subscribe({
        next: () => {
          console.log(`Successfully saved item`);
        },
        error: (err: RestErrorResponse) => {
          console.error(err);
        },
      });

      futurCsv.push(futurCsvLine)
    }
  )
    this.csvString = this.papa.unparse(futurCsv,{delimiter:"	"})
    console.log(this.csvString)
    
  }
  
  // Fonction permettant de créer une liste de maps contenant en clé les champs en en-tête du csv et en valeur, la valeur associée à cette colonne dans le csv.
    parsedCsvToMap(csvData: string[][]): Map<string,string>[]{
      const header:string[] = csvData[0];
      var csvMap : Map<string,string>[] = [];

      
      for(let line= 1; line<csvData.length; line++){
         let temp : Map<string,string>= new Map();
          for(let column=0;column<header.length;column++){

            // Je construis la map
            temp.set(header[column],csvData[line][column]);

            //Je construis la liste des code barres (qui me sert ensuite à retrouver la map dans la liste de maps)
            if (column == 0){
              this.barcodeList[line-1] = csvData[line][column];
            } 
          }
          csvMap[line-1] = temp;
      }
      return csvMap;
    }

    // Fonction qui permet de retrouver une ligne du csv dans la liste des lignes
    findMapInMapList(barcode:string, csvMap:Map<string,string>[] ):Map<string,string>{
      const index:number =  this.barcodeList.findIndex((code) => code === barcode );
      return csvMap[index];
    }

}