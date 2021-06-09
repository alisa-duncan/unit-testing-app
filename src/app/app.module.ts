import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleComponent } from './simple/simple.component';
import { PizzaDepComponent } from './pizza-dep/pizza-dep.component';
import { LunchComponent } from './lunch/lunch.component';
import { NomsComponent } from './noms/noms.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleComponent,
    PizzaDepComponent,
    LunchComponent,
    NomsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
