import { BootstrapOptions, Component, OnDestroy, OnInit } from '@angular/core';
import { Papa, ParseResult, UnparseConfig } from 'ngx-papaparse';
import { Item } from '../models/item.model';
import { AlmaService } from '../services/alma.service';
import { RestErrorResponse, AlertService} from '@exlibris/exl-cloudapp-angular-lib';
import { finalize } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

// Po-line-export
//preferred_language_ca
// bulk_item_checkout

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  // Labels
 isWrongFileTypeLabel:string;
 evaluatingLabel:string;
 aa:string;
 files:File[] = [];
 barcodeList: string[] = [];
 hasEvaluationEnded:boolean = false
 maxLinesForCsv:number = 100

// Fichiers de logs
 csvString :string = ""
 journal:string = ""



  constructor(private papa: Papa, private almaService: AlmaService,private translate: TranslateService,){
    this.isWrongFileTypeLabel = "";
    this.evaluatingLabel = "";
    this.aa = ""
    
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
              this.translate.get("Back-end.WrongFileType").subscribe(text=>this.isWrongFileTypeLabel= text);
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

    // Erreur si fichier trop long
    if(parsedFile.data.length> this.maxLinesForCsv +1 ){
      this.isWrongFileTypeLabel = this.translate.instant("Back-end.BadLength",
        {maxLinesForCsv: this.maxLinesForCsv})
      return
    }

    this.translate.get("Back-end.Loading").subscribe(text=>this.evaluatingLabel= text);

    // Ajout des noms des différentes colonnes dans le futur csv de backup
    futurCsv.push(header)

    for(let index= 0; index<csvMapList.length; index++){
      await this.almaService.getBarcode(csvMapList[index].get("barcode")!)
        .then((i:Item)=> itemList.push(i))
        .catch((err)=> {
          console.log(err)
          var line:string = `Barcode: ${csvMapList[index].get("barcode")} | Message: ${err.message} \n`
          this.journal = this.journal + line
      });

    }

    // Préparation des items et du csv de backup
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

      futurCsv.push(futurCsvLine)
    })

    // Update des items
    this.almaService.updateArrayOfItems(itemList).pipe(
      finalize(()=> {
        this.translate.get("Back-end.EndOfProcess").subscribe(text=>this.evaluatingLabel= text);
        this.hasEvaluationEnded = true;
        this.downloadReturnFile()})
    ).subscribe({
        next: () => {
          console.log(`Successfully saved items`);
        },
        error: (err: Error) => {
          var line:string = `UpdateItems | Message: ${err.message} \n`
          this.journal = this.journal + line
        },
      })
    this.csvString = this.papa.unparse(futurCsv,{delimiter:"	"})
    console.log(this.journal)
    
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

     downloadReturnFile() {
    const blob = new Blob([this.csvString], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'return_barcodes.txt';
    link.click();
    window.URL.revokeObjectURL(url);
  }

}