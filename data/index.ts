/* Search input */
export const placeholders = ["Tokyo", "Madrit", "Cracow", "Oslo", "Paris"];

export interface data {
  timezone?: number | null;
  main?: {
    temp?: number | null;
    feels_like?: number | null;
    pressure?: number | null;
    humidity?: number | null;
    temp_min?: number | null;
    temp_max?: number | null;
  } | null;
  weather?: Array<{
    main?: string | null;
    description?: string | null;
    icon?: string | null;
  }> | null;
  sys?: {
    country?: string | null;
    sunrise?: number | null;
    sunset?: number | null;
  } | null;
  name?: string | null;
  wind?: {
    speed?: number | null;
    deg?: number | null;
  } | null;
  clouds?: {
    all?: number | null;
  }
  dt?: number
}