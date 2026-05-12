import { Component, OnDestroy, OnInit } from '@angular/core';
import { Papa, ParseResult } from 'ngx-papaparse';
import { Item } from '../models/item.model';
import {finalize } from "rxjs/operators";
import { AlmaService } from '../services/alma.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
 isWrongFileTypeLabel:String;
 files:File[] = [];
 futurCsv : Array<Array<String>> = new Array();
 barcodeList: string[] = []


  constructor(private papa: Papa, private almaService: AlmaService){
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
      var itemBackup: Array<Item> = new Array()
      var csvMap : Map<string,string>[] = this.parsedCsvToMap(parsedFile.data)

      console.log("la liste de maps")
      console.log(csvMap)
      console.log("la liste des code barres")
      console.log(this.barcodeList)
      
 
      for(let item= 0; item<csvMap.length; item++){
        await this.almaService.getBarcode(csvMap[item].get("barcode")!)
        .then((i:Item)=> itemBackup.push(i))
        .catch((err)=> {console.log(err); console.log(csvMap[item].get("barcode"))});

    }
    console.log("je suis sorti avec ca :")
    console.log(itemBackup)
    console.log(itemBackup[0].item_data)
      
  }


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

    findMap(barcode:string, csvMap:Map<string,string>[] ):Map<string,string>{
      const index:number =  this.barcodeList.findIndex((code) => code === barcode );
      return csvMap[index];
    }
}