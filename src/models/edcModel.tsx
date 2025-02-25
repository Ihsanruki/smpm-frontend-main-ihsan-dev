export interface ElectronicDataCaptureMachine {
  id: number;
  owner_id: number;
  mid: string;
  tid: string;
  brand: string;
  brand_type: string;
  serial_number: string;
  status_owner: string;
  status_owner_desc: string;
  status_machine: string;
  status_machine_desc: string;
  status_active: boolean;
  simcard_provider?: string;
  simcard_number: string;
  info?: string;
  created_by?: number;
  updated_by?: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
