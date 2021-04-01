import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TileService } from '../../services/tile.service';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {
  constructor(private tileService: TileService) {
  }

  @Input()
  posts: any;

  @Output() 
  upVoteItem = new EventEmitter<any>();

  ngOnInit(): void {
  }

  public upVote(item: any): void {
    this.upVoteItem.emit(item);
  }
}

