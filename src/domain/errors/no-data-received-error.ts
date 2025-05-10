export class NoDataReceivedError extends Error {
  constructor() {
    super("No data received");
    this.name = "NoDataReceivedError";
  }
}