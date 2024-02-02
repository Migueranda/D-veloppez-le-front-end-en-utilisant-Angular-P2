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
  public lineData :LineData [] = [];
  public olympics$: Observable<Olympic[]> = of([]);
  public olympicData: Olympic [] = [];

  public selectedCountry: Olympic = {
    id: 0,
    country: '',
    participations: []
  }

  view: [number, number] = [0, 0]; // Initialize with default values if needed
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

// Récupération de l'id dans le path
  ngOnInit(): void {
    const countryId : string|null = this.route.snapshot.paramMap.get('id')
    this.olympicService.loadInitialData()  
      .subscribe({
        next:(
          value => {
            this.olympicData = value;
            if(countryId){
              for(let country of this.olympicData){ 
                if(country.id === +countryId){
                  this.selectedCountry = country;
                }
              }
              this.setLineData();
              this.lineData = [...this.lineData];
            }
          }
        )
      }); 
  }

  onBackToHome(){
    this.router.navigateByUrl('/');
  }
 // calcul du nombre de médailles de chaque pays
  getNumberOfMedalsCount(){
    let number = 0;
    for(let participation of this.selectedCountry.participations){
      number += participation.medalsCount;
    }
    return number
  }
  // calcul du nombre d'athlètes de chaque pays
  getNumberOfAthletes(){
    let number = 0;
    for(let participation of this.selectedCountry.participations){
      number += participation.athleteCount;
    }
    return number
  }
  //preparation de données pour le graphique line chart
  setLineData(){
    let objetData: LineData = {
      name: this.selectedCountry.country,
      series: []
    }

    for(let participation of this.selectedCountry.participations){
      let serieData: SerieData = {
            name: '',
            value: 0
          }  
          serieData.value = participation.medalsCount 
          serieData.name = String(participation.year);
      objetData.series.push(serieData);
    }
    this.lineData.push(objetData);
  }

  onResize(event: Event) : void {
    //condition pour eviter des erreurs dans le cas où event.target soit null or pas une instance de window
    if (event && event.target instanceof Window){
      this.view = [event.target.innerWidth / 1.35, 400];
    }
    
  }

}