import { AbstractRo } from '../../../common/dto/AbstractRo';
import { QualityEntity } from '../quality.entity';

export class QualityRo extends AbstractRo {
  paperBatchNumber: string;
  liquidBatchNumber: string;

  lRangeLow: number;
  lRangeHigh: number;

  hRangeLow: number;
  hRangeHigh: number;

  lValue: number;
  hValue: number;

  date: Date;

  constructor(quality: QualityEntity) {
    super(quality);

    [
      'paperBatchNumber',
      'liquidBatchNumber',
      'lRangeLow',
      'lRangeHigh',
      'hRangeLow',
      'hRangeHigh',
      'lValue',
      'hValue',
      'date',
    ].forEach((key) => (this[key] = quality[key]));
  }
}
