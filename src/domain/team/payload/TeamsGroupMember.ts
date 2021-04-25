export class TeamsGroupMember {
  private __id: string;

  private _teams: Array<{teamId: string}>;

  get _id(): string {
    return this.__id;
  }

  set _id(value: string) {
    this.__id = value;
  }

  get teams(): Array<{ teamId: string }> {
    return this._teams;
  }

  set teams(value: Array<{ teamId: string }>) {
    this._teams = value;
  }
}
