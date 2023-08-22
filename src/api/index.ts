import { Database } from './schema';

export type RowType<TableName extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][TableName]['Row'];
