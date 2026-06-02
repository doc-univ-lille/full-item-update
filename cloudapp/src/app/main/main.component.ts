import { Component, OnDestroy, OnInit } from '@angular/core';
import { Papa, ParseResult} from 'ngx-papaparse';
import { Item } from '../models/item.model';
import { AlmaService } from '../services/alma.service';
import {InitData} from '@exlibris/exl-cloudapp-angular-lib';
import { finalize } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { CloudAppEventsService } from '@exlibris/exl-cloudapp-angular-lib';
import { ItemUtils }from '../ItemUtils'

// Po-line-export
//preferred_language_ca
// bulk_item_checkout

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  maxLinesForCsv:number = 100

  // Labels
 ErrorLabel:string;
 evaluatingLabel:string;

 hasEvaluationEnded:boolean = false
 isAdmin:boolean = false
 needToStop = false

 files:File[] = [];
 barcodeList: string[] = [];
 itemutils:ItemUtils;


// Fichiers de logs et de backup
 csvString :string = ""
 journal:string = ""



  constructor(private papa: Papa, 
    private almaService: AlmaService,
    private translate: TranslateService,
    private eventsService: CloudAppEventsService,
    ){

    this.ErrorLabel = "";
    this.evaluatingLabel = "";
    this.itemutils = new ItemUtils()
    
  }
 
  ngOnInit() {

    // Gestion des droits
    this.eventsService.getInitData().subscribe((data:InitData) => {
      if(data.user.isAdmin){
        this.isAdmin =true;
      }else{
        this.isAdmin = false
      }
 
  })
  }

  ngOnDestroy(): void {
  }

// Méthode appelée lorsqu'un fichier est inséré.
  onFileChange(event:any ){
    const file:File = event.target.files[0];
    this.resetApplication()

      if (file) {
        // Vérification du type de fichier
        if (file.type == "text/csv"){
          this.ErrorLabel = "";
          this.files[0] = file;
        }
        else{
          this.translate.get("Back-end.WrongFileType").subscribe(text=>this.ErrorLabel= text);
        }
      }
  }


    //Méthode permessant le parsing du fichier csv (et la vérification du délimiteur)
  load(){
     this.papa.parse(this.files[0],{
        complete: (result) => {
          if (result.meta.delimiter != "	"){
            this.translate.get("Back-end.BadDelimiter").subscribe(text=>this.ErrorLabel= text); return
          }else {
          this.evaluateParsing(result)
          }
        }})
   }

  //Méthode permettant le traitement du fichier parsé
  async evaluateParsing( parsedFile:ParseResult){

    var itemList: Array<Item> = new Array()
    var csvMapList : Map<string,string>[] = this.parsedCsvToMap(parsedFile.data)
    var futurCsv : Array<Array<any>> = new Array();
    const header:string[] = parsedFile.data[0];

    

    // Erreur si fichier trop long
    if(parsedFile.data.length> this.maxLinesForCsv +1 ){
      this.ErrorLabel = this.translate.instant("Back-end.BadLength",
        {maxLinesForCsv: this.maxLinesForCsv})
      return
    }
    
    // Affichage du message de chargement
    this.translate.get("Back-end.Loading").subscribe(text=>this.evaluatingLabel= text);

    // Ajout des noms des différentes colonnes dans le csv de backup
    futurCsv.push(header)

    // Pour toutes les lignes du csv, on récupère l'item grâce au code barre (si item non trouvé, une ligne est ajoutée au fichier de logs)
    for(let index= 0; index<csvMapList.length; index++){
      await this.almaService.getBarcode(csvMapList[index].get("barcode")!)
        .then(
          (i:Item)=> itemList.push(i)
        ).catch(
          (err)=> {
          console.log(err)
          var line:string = `Barcode: ${csvMapList[index].get("barcode")} | Message: ${err.message} \n`
          this.journal = this.journal + line
      });

    }

    // On regarde si les noms des colonnes sont valide
    header.forEach(label => {
      if(!this.itemutils.isInAcceptedHeaders(label)){
         this.ErrorLabel = this.translate.instant("Back-end.BadHeaderLabel",{headerLabel: label})
         this.needToStop=true
         return
      }
    });

    // Si un nom de colonne n'est pas valide, on arrête tout
    if(this.needToStop){
      this.evaluatingLabel = "";
      return
    }


    // Préparation des items et du csv de backup
    itemList.forEach((item:Item) =>{

      let modifiedItem:Item = item;
      let csvData:Map<string,string> = this.findMapInMapList(modifiedItem.item_data.barcode, csvMapList);
      let futurCsvLine: Array<string> = []

      // Insertion de l'en-tête du csv de backup
      futurCsvLine.push(<string>item["item_data"][header[0] as keyof Item["item_data"]]);
      
      // Insertion de chaque valeur de l'item dans la bonne colonne du csv de backup et modification de l'item
      for(let index=1; index<header.length; index++){
        let headerLabel:string = header[index];

          // Insertion de la valeur dans le csv de backup
          futurCsvLine.push(this.itemutils.getValueByHeaderLabel(headerLabel,item));

          // /!\ Cette ligne est APRES l'insertion de la ligne de backup dans le futur csv car elle modifie l'item
          item = this.itemutils.modifItem(headerLabel,item,csvData.get(headerLabel)!)

      }

      futurCsv.push(futurCsvLine)
    })


    // Update des items
    this.almaService.updateArrayOfItems(itemList).pipe(
      finalize(()=> {
        // Passage du texte à "traitement terminé" et affichage des boutons
        this.translate.get("Back-end.EndOfProcess").subscribe(text=>this.evaluatingLabel= text);
        this.hasEvaluationEnded = true;})
    ).subscribe({
        next: () => {
          console.log(`Successfully saved items`);
        },
        error: (err: Error) => {
          var line:string = `UpdateItems | Message: ${err.message} \n`
          this.journal = this.journal + line
        },
      })
    
    // Stockage du string de csv de backup
    this.csvString = this.papa.unparse(futurCsv,{delimiter:"	"})
    
  }
  


  // Fonction permettant de créer une liste de maps contenant en clé les champs en en-tête du csv et en valeur, la valeur associée à cette colonne dans le csv.
  // Retourne une Liste Map<En-tête du champ: valeur de la ligne>
    parsedCsvToMap(csvData: string[][]): Map<string,string>[]{
      const header:string[] = csvData[0];
      var csvMap : Map<string,string>[] = [];

      
      for(let line= 1; line<csvData.length; line++){
         let temp : Map<string,string>= new Map();
          for(let column=0;column<header.length;column++){

            // Construction de la map  clé: en-tête du champ, valeur: valeur de la ligne
            temp.set(header[column],csvData[line][column]);

            //Construction de la liste des code barres (qui sert ensuite à retrouver la map dans la liste de maps)
            if (column == 0){
              this.barcodeList[line-1] = csvData[line][column];
            } 
          }
          // Ajout de la map dans la liste de map ([line-1] car le header du csv inséré n'est pas dans csvMap)
          csvMap[line-1] = temp;
      }
      return csvMap;
    }

    // Fonction qui permet de retrouver une ligne du csv dans la liste au format Map
    findMapInMapList(barcode:string, csvMap:Map<string,string>[] ):Map<string,string>{
      const index:number =  this.barcodeList.findIndex((code) => code === barcode );
      return csvMap[index];
    }


    // Fonction permettant de télécharger le fichier de backup
    downloadBackupFile() {
      const blobBackupFile = new Blob([this.csvString], { type: 'text/csv' });
      const urlBackupFile = window.URL.createObjectURL(blobBackupFile);
      const linkBackupFile = document.createElement('a');
      linkBackupFile.href = urlBackupFile;
      linkBackupFile.download = 'backup.xlsx';
      linkBackupFile.click();
      window.URL.revokeObjectURL(urlBackupFile);
      
  }

  // Fonction permettant de télécharger le fichier de logs
  downloadLogsFile() {

      const blobLogs = new Blob([this.journal], { type: 'text/plain' });
      const urlLogs = window.URL.createObjectURL(blobLogs);
      const linkLogs = document.createElement('a');
      linkLogs.href = urlLogs;
      linkLogs.download = 'logs.txt';
      linkLogs.click();
      window.URL.revokeObjectURL(urlLogs);
      
  }

  // Fonction permettant réinitialiser l'application
  resetApplication(){
    this.ErrorLabel = "";
    this.evaluatingLabel= "";
    this.hasEvaluationEnded = false
  }

}