import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { SettingsComponent } from './components/settings/settings.component';
import { GoComponent } from './components/go/go.component';
import { RecentlyAddedComponent } from './components/recently-added/recently-added.component';
import { WordComponent } from './components/word/word.component';
import {HttpClientModule} from "@angular/common/http";
import { GlobalErrorComponent } from './components/global-error/global-error.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AddWordComponent } from './components/add-word/add-word.component';
import { ChooseLanguageComponent } from './components/choose-language/choose-language.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    GoComponent,
    RecentlyAddedComponent,
    WordComponent,
    GlobalErrorComponent,
    NavigationComponent,
    AddWordComponent,
    ChooseLanguageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
