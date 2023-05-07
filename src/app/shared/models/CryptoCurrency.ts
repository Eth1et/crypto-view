import { CurrencyValue } from "./CurrencyValue";

export interface CryptoCurrency{
    name: string;
    abbreviation: string;
    values: CurrencyValue[];
}