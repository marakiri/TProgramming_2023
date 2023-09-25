export class Phone {
  private aYear: number;
  phoneNumber: string;

  static phoneCount = 0;

  constructor(number: string, year: number, public name?: string) {
    Phone.phoneCount += 1;
    this.phoneNumber = number;
    this.year = year;
    this.name = name;
  }

  call(number: string) {
    console.log(`Making a call from ${this.phoneNumber} to ${number}`);
  }
  endCall() {
    console.log('Ending call');
  }

  set year(year: number) {
    this.aYear = year >= 1900 && year < 2023 ? year : this.aYear ?? 1900;
  }

  get year(): number {
    return this.aYear;
  }
}