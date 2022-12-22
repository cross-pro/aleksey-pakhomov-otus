import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SettingsComponent } from './components/settings/settings.component';
import { GoComponent } from './components/go/go.component';
import { RecentlyAddedComponent } from './components/recently-added/recently-added.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    GoComponent,
    RecentlyAddedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
