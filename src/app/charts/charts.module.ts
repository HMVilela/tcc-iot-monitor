import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts.component';

import { Ng2HighchartsModule } from 'ng2-highcharts';

@NgModule({
    imports: [CommonModule, Ng2HighchartsModule],
    declarations: [ChartsComponent],
    exports: [ChartsComponent]
})

export class ChartsModule { }