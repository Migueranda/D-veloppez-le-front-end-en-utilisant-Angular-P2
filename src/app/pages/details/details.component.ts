import { Component, OnInit } from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
import { Observable,of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SerieData, LineData } from 'src/app/core/models/serieData';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public lineData :LineData [] = [] 
  public olympics$: Observable<Olympic[]> = of([]);
  public olympicData: Olympic [] = [];
  public selectedCountry: Olympic = {
    id: 0,
    country: '',
    participations: []
  }

  multi = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "1990",
          "value": 62000000
        },
        {
          "name": "2010",
          "value": 73000000
        },
        {
          "name": "2011",
          "value": 89400000
        }
      ]
    },
  
    {
      "name": "USA",
      "series": [
        {
          "name": "1990",
          "value": 250000000
        },
        {
          "name": "2010",
          "value": 309000000
        },
        {
          "name": "2011",
          "value": 311000000
        }
      ]
    },
  
    {
      "name": "France",
      "series": [
        {
          "name": "1990",
          "value": 58000000
        },
        {
          "name": "2010",
          "value": 50000020
        },
        {
          "name": "2011",
          "value": 58000000
        }
      ]
    },
    {
      "name": "UK",
      "series": [
        {
          "name": "1990",
          "value": 57000000
        },
        {
          "name": "2010",
          "value": 62000000
        }
      ]
    }
  ];
 
  view: any = [];
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  timeline: boolean = true;
  colorSchemePC = "cool";
  

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService,
    private router: Router
  ) {
    Object.assign(this, { olympicService });
    this.view = [innerWidth / 1.3, 400];
  }

  ngOnInit(): void {
    const countryId : string|null = this.route.snapshot.paramMap.get('id')// code pour recuperer l'id dans le path
    console.log('countryId')
    console.log(countryId)

    

    this.olympicService.loadInitialData()
      .subscribe({
        next:(
          value => {
            this.olympicData = value;
            if(countryId){
              for(let country of this.olympicData){ 
                if(country.id === +countryId){
                    this.selectedCountry = country
                }
              }
              console.log('this.selectedCountry')
              console.log(this.selectedCountry)
              this.setLineData()
              this.lineData = [...this.lineData]
            }
          }
        )
      }); 
  }

  onBackToHome(){
    this.router.navigateByUrl('/')

  }

  getNumberOfMedalsCount(){
    let number = 0
    for(let participation of this.selectedCountry.participations){
      number += participation.medalsCount
    }
    return number
  }

  getNumberOfAthletes(){
    let number = 0
    for(let participation of this.selectedCountry.participations){
      number += participation.athleteCount
    }
    return number
  }

  setLineData(){
    // public serieData :{name: string, value: number} [] = []
    // public lineData :{name: string, series: [] } [] = [] 

    let objetData: LineData = {
      name: this.selectedCountry.country,
      series: []
    }

    // let objetData :{name: string, series: [] } ={
    //   name: this.selectedCountry.country,
    //   series: []
    // }

    for(let participation of this.selectedCountry.participations){
      let serieData: SerieData = {
            name: '',
            value: 0
          }  
          serieData.value = participation.medalsCount 
          serieData.name = String(participation.year)
      objetData.series.push(serieData)
    }
  this.lineData.push(objetData)
    console.log(this.lineData)
  }

  onResize(event: any) {
    this.view = [event.target.innerWidth / 1.35, 400];
  }

}
