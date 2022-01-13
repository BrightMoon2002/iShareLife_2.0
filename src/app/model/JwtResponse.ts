export class JwtResponse {
  public token: string;
  public name: string;
  public roles: any[];
  public id: string;

  constructor(token: string, name: string, roles: any[], id: string) {
    this.token = token;
    this.name = name;
    this.roles = roles;
    this.id = id;
  }
}
