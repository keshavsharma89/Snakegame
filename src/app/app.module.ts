import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsersComponent } from './Components/users/users.component';
import { SnakeComponent } from './Components/snake/snake.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    SnakeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
