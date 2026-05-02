export interface TaxCalculationInput {
  baseValue: number
  taxRates: { type: string; rate: number }[]
}

export interface TaxCalculationResult {
  baseValue: number
  taxes: { type: string; rate: number; value: number }[]
  totalTaxes: number
  finalValue: number
}

export class CalculateTaxesUseCase {
  execute(input: TaxCalculationInput): TaxCalculationResult {
    const taxes = input.taxRates.map(tax => ({
      type: tax.type,
      rate: tax.rate,
      value: input.baseValue * (tax.rate / 100)
    }))

    const totalTaxes = taxes.reduce((sum, tax) => sum + tax.value, 0)

    return {
      baseValue: input.baseValue,
      taxes,
      totalTaxes,
      finalValue: input.baseValue + totalTaxes
    }
  }
}
