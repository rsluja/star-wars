import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  @Input()
  dataSource = [];

  @Input()
  columnDefinition = [];

  @Input()
  currentPage:number = 1;

  @Output()
  page: EventEmitter<any> = new EventEmitter();

  @Output()
  change: EventEmitter<number> = new EventEmitter();

  constructor() { 
  }

  ngOnInit() {
  }

  handleChange($event) {
    this.page.emit($event);
  }

  openDialog(item) {
    this.change.emit(item);
  }

}
