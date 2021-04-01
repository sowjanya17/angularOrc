import { Component, OnInit } from '@angular/core';
import { TileService } from '../shared/services/tile.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import filters from '../shared/filters.json';



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
  itemsAsObjects: any = new Array();
  regionArray: any = filters.regions;
  lobArray: any = filters.lobs;
  assetTypeArray: any = filters.assetType;

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
    var i = 0;
    do {
      this.displayTiles.push(this.tilesData[i]);
      i++;
    } while (i != 10);
    this.displayedItems += 10;
    this.disableLoad = (this.displayedItems >= this.tilesData.length) ? true : false;
  }

  upvote(item): void {
    item.upvote += 1;
    this.tileService.upVote(item).subscribe(data => {
    });
  }
  onRemove(item) {
    filters[item.module][item.index]['selected']=false;
    return of(item);
  }

  checkBoxSelect(event) {
    var itemChecked = event.source.__ngContext__[8].checkBoxLabel;
    console.log('Item Checked', itemChecked);
    if (event.checked) {
      this.itemsAsObjects.push(itemChecked);
    }
  }
}
