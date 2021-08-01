export class Property {
  public _id: string;
  public address: string;
  public photo: string;
  public result: string;
  public lotArea: number;
  public basement: number;
  public livingArea: number;
  public baths: number;
  public rooms: number;
  public bedRooms: number;
  public deck: number;
  public firstFloor: number;
  public secondFloor: number;
  public carsGarage: number;
  public lat: number;
  public lng: number;

  constructor(address: string, photo: string, result: string, lotArea: number, basement: number,
              livingArea: number, baths: number, rooms: number, bedRooms: number, deck: number,
              firstFloor: number, secondFloor: number, carsGarage: number) {
    this.address = address;
    this.photo = photo;
    this.result = result;
    this.lotArea = lotArea;
    this.basement = basement;
    this.livingArea = livingArea;
    this.baths = baths;
    this.rooms = rooms;
    this.bedRooms = bedRooms;
    this.deck = deck;
    this.firstFloor = firstFloor;
    this.secondFloor = secondFloor;
    this.carsGarage = carsGarage;
  }
}
