export class NumberOfTeamOfMemberInOrg {
  private _memId: string;

  private _numberOfTeams: number;

  get memId(): string {
    return this._memId;
  }

  set memId(value: string) {
    this._memId = value;
  }

  get numberOfTeams(): number {
    return this._numberOfTeams;
  }

  set numberOfTeams(value: number) {
    this._numberOfTeams = value;
  }
}
