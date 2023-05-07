import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangeRatesRoutingModule } from './exchange-rates-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { ExchangeRatesComponent } from './exchange-rates.component';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CustomCurrencyPipe } from 'src/app/shared/pipes/custom-currency.pipe';


@NgModule({
  declarations: [
    ExchangeRatesComponent,
    CustomCurrencyPipe
  ],
  imports: [
    CommonModule,
    ExchangeRatesRoutingModule,
    MatCardModule,
    MatAutocompleteModule,
    MatTableModule,
    MatDividerModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class ExchangeRatesModule { }
