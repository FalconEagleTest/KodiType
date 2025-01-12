import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaItem } from '../../models/media-item.interface';

@Component({
  selector: 'app-media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MediaItemComponent {
  @Input() item!: MediaItem;
  @Input() isSelected: boolean = false;
  @Output() selected = new EventEmitter<MediaItem>();

  onSelect(): void {
    this.selected.emit(this.item);
  }
}