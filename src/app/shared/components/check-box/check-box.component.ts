import { OnChanges } from "@angular/core";
import { Component, OnInit ,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent implements OnInit {

  @Input()
  checkBoxLabel: any;

  @Output() 
  checkBoxSelect = new EventEmitter<any>();
  constructor() { }
  
  ngOnInit(): void {
  }

  public setCheck(event): void {
    this.checkBoxSelect.emit(event);
  }

}
