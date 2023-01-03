import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RecentlyAddedComponent} from "./components/recently-added/recently-added.component";
import {GoComponent} from "./components/go/go.component";
import {SettingsComponent} from "./components/settings/settings.component"


const routes: Routes = [
  {path: "", component: RecentlyAddedComponent},
  {path:"go", component: GoComponent},
  {path: "settings", component: SettingsComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ], exports: [RouterModule]
})




export class AppRoutingModule {
}
