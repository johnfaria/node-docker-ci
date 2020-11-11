// font: https://codeburst.io/typeorm-by-example-part-3-e82180819c3c

import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

const REGEX = /^[A-Z]/
const MESSAGE = 'Text ($value) is does not start with capital letter!'

@ValidatorConstraint({ name: 'capitalLetter', async: false })
export default class CapitalLetterValidator
  implements ValidatorConstraintInterface {
  public validate(text: string): boolean {
    return REGEX.test(text)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public defaultMessage(args: ValidationArguments): string {
    return MESSAGE
  }
}
