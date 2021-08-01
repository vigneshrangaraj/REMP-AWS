export enum TYPES {
  success,
  warning,
  danger
}

export class Notification {

  public type: string;
  public boldMessage: string;
  public message: string;

  constructor(type: TYPES, boldMessage: string, message: string) {
    this.type = TYPES[type];
    this.boldMessage = boldMessage;
    this.message = message;
  }
}
