export interface CountersType extends CountersAddres {
  area: { id: string };
  brand_name: string | null;
  _type: 'ColdWaterAreaMeter' | 'HotWaterAreaMeter';
  installation_date: string;
  is_automatic: boolean | null;
  initial_values: number[];
  description: string;
  id: string;
}
export type ResponseCountersType = {
    next: string;
    results: CountersType[];
    count:number
  };
export interface CountersAddres {
  addres: string;
}

