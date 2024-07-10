import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { JwtModule } from '@auth0/angular-jwt'; // Import JwtModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { AdminProgramComponent } from './admin-program/admin-program.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { CritiqueFormComponent } from './critique-form/critique-form.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://127.0.0.1:5000', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HomepageComponent,
    AdminComponent,
    AdminProgramComponent,
    SignupComponent,
    LoginComponent,
    CreatePostComponent,
    CritiqueFormComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token'); // Adjust this based on how your tokens are stored
        }
      }
    })
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
