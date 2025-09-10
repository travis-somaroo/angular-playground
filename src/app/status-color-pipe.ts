import { Pipe, PipeTransform } from '@angular/core';
import { mapStatusToColor } from './status-mapper-util';

@Pipe({
  name: 'statusColor',
  pure: true
})
export class StatusColorPipe implements PipeTransform {

  // will only trigger change detection ONLY when status property of customer changes
  public transform(status: 'active' | 'inactive'): string {
    return mapStatusToColor(status);
  }

}
