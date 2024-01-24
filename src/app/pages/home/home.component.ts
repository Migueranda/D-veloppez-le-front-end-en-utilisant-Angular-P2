import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',   
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

  public olympics$: Observable<Olympic[]> = of([]);
  public olympicData:Olympic [] = [];
  public pieData :{name: string, value: number} [] = []

  // ngx - options (librairie graphique)
  // view: [number, number] = [];
  // view: any = [];
  animationPC = false;
  colorSchemePC = "cool";
  labelsPC = true;
  doughnut = false;
 
  constructor(
    private olympicService: OlympicService, 
    private router: Router
  ){
    Object.assign(this, { OlympicService });
    // this.view = [innerWidth / 1.3, 400];
  }

  // init
  ngOnInit(): void {
    // chargement des données à partir du service vers this.olympicData
    this.olympicService.loadInitialData()
      .subscribe({
        next:(
          value => {
            this.olympicData = value;
            // formater les données pays/nombre médailles comme attendu par la lib 
            this.setPieData()
            // Solution pour faire comprendre à lib ngx que de nouvelles valeurs sont présentes dans this.pieData
            // https://github.com/mattlewis92/angular-calendar/issues/249
            this.pieData = [...this.pieData]
          }
        )
      });
  }

  
  // number of JO
  getNumberOfJo(){
    let numberOfJo = new Set<Number>();

    for(let country of this.olympicData){ 
      for(let participation of country.participations) {
        if(!numberOfJo.has(participation.year)){
          numberOfJo.add(participation.year)
        }
      }
    }
    return numberOfJo.size
  } 
  
  // number of contries
  getNumberOfCountries(){
    let numberOfCountries = new Set<string>();

    for(let country of this.olympicData){ 
      if(!numberOfCountries.has(country.country)){
        numberOfCountries.add(country.country)
      }
    }
    return numberOfCountries.size
  }

  // source : olympicData => résultat : pieData comme attendu dans le graph demandé
  setPieData(){
    for(let country of this.olympicData){ 
      let olympicCountry: {name: string, value: number} = {
        name: '',
        value: 0
      }  
      olympicCountry.name = country.country    
      for(let medalsCount of country.participations) {
        olympicCountry.value += medalsCount.medalsCount 
      }
      this.pieData.push(olympicCountry)
    }
   }

  setPieHeight(width:number){
    let height: number = 400
    if (width < 400){
      height = width - width/3
    } 
    return height
  }

  // selection d"un pays dans le Graph Pie => routage vers page détail en fonction de l'ID du pays
  onSelect(sliceData: {name: string, value: number, label:string}): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(sliceData)));
    for(let country of this.olympicData){ 
      if(country.country === sliceData.name){
        this.router.navigate(['/detail', country.id])
      }
    }
  }

  // onResize(event: any) {
  //   this.view = [event.target.innerWidth / 1.35, 400];
  // }

  

}
