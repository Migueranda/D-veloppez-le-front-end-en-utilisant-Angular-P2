import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailsComponent } from './pages/details/details.component';
//******************************************* */
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PagesComponent } from './toolTip/pages/pages.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, DetailsComponent, PagesComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule , NgxChartsModule,
    BrowserAnimationsModule ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
