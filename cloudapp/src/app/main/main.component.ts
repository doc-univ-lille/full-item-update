import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import {
  AlertService,
  CloudAppEventsService,
  CloudAppRestService,
  Entity,
  HttpMethod,
  Request,
  RestErrorResponse
} from '@exlibris/exl-cloudapp-angular-lib';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Papa, ParseResult } from 'ngx-papaparse';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
 isWrongFileTypeLabel:String;
 files:File[] = [];


  constructor(private papa: Papa){
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

          //TODO : externaliser le load par la suite dans bouton HTML
          this.load();


        }
            else{
              this.isWrongFileTypeLabel = "Veuillez entrer un fichier .csv";
            }
        }
    }


    load(){
       this.papa.parse(this.files[0],{header:true,
          complete: (result) => {
            //console.log('Parsed: ', result)
            this.evaluateParsing(result)
          }})
    }

    evaluateParsing( parsedFile:ParseResult){
      console.log("je m'évaluate le parsing")
      console.log(parsedFile.data)
    }
}