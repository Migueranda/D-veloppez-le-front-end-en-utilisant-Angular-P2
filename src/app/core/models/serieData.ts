export class SerieData{
    name!: string;
    value!: number;
}

export class LineData{
    name!: string;
    series!: SerieData[]
}
