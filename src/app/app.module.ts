import { BrowserModule, } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListItemComponent } from './navigation/sidenav-list-item/sidenav-list-item.component';
import { AuthService } from './auth/auth.service';
import { ExerciseService } from './training/exercise.service';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment.prod';
import UIService from './shared/ui.service';
import {AuthModule} from './auth/auth.module'
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AuthModule
  ],
  providers: [AuthService, ExerciseService, UIService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
