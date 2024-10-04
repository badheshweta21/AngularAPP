import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserCardComponent } from './components/user-card/user-card.component';
import { UsersCardsComponent } from './components/users-cards/users-cards.component';
import { UsersService } from './services/users.service';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersRoutingModule } from './uses-routing.module';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    UserCardComponent,
    UsersCardsComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    UsersRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  providers: [
    UsersService,
    provideHttpClient()
  ]
})
export class UsersModule { }
