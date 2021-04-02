import { Component, OnInit } from '@angular/core';
import { TileService } from '../shared/services/tile.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import filters from '../shared/filters.json';
import { TagInputModule } from 'ngx-chips';
TagInputModule.withDefaults({
  tagInput: {
    placeholder: '',
    hideForm: true
  }
});



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  tilesData: any = [];
  displayedItems: number = 0;
  displayTiles: any = [];
  disableLoad: boolean = false;
  filterObject: any = new Array();
  regionArray: any = filters.region;
  lobArray: any = filters.lob;
  assetTypeArray: any = filters.type;
  filteredData: any = [];
  showFilter: boolean = false;

  constructor(private tileService: TileService) {
  }

  ngOnInit(): void {
    this.getTilesData();
  }

  getTilesData() {
    this.tileService.getTilesData().subscribe(data => {
      this.tilesData = data;
      this.displayRecords();
    });
  }

  displayRecords(): void {
    var data = (this.filterObject.length > 0) ? this.filteredData : this.tilesData;
    var i = 0;
    do {
      this.displayTiles.push(data[i]);
      i++;
    } while (i != 10);
    this.displayedItems += 10;
    this.disableLoad = (this.displayedItems >= data.length) ? true : false;
  }

  displayFilteredRecords(): void {
    for (var i = 0; i < this.filterObject.length; i++) {
      var filter = this.filterObject[i];
      this.filteredData.push(...this.tilesData.filter(function (el) { return el[filter.module].includes(filter.value) }));//spread operator
    }
    this.displayTiles = [];
    this.displayRecords();
  }
  upvote(item): void {
    item.upvote += 1;
    this.tileService.upVote(item).subscribe(data => {
    });
  }
  onRemove(item) {
    console.log('Modules', filters[item.module]);
    filters[item.module][item.index]['selected'] = false;
    return of(item);
  }

  checkBoxSelect(event) {
    var itemChecked = event.source.__ngContext__[8].checkBoxLabel;
    console.log('Item Checked', itemChecked);

    if (event.checked) {
      this.filterObject.push(itemChecked);
    }

    else {
      this.filterObject = this.filterObject.length > 0 ? this.filterObject.filter(function (el) { return el.value != itemChecked.value; }) : [];
    }
  }
  showFilters() {
    console.log('Hello');
    this.showFilter = !this.showFilter;
  }
}
