import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule
    ],
    exports: [
        CommonModule,    
        MaterialModule,
        FormsModule,
        FlexLayoutModule,
    ]
})
export class SharedModule{

}