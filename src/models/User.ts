import { Model } from './Model';
import { Attributes } from './Attributes';
import { ApiSync } from './APISync';
import { Eventing } from './Eventing';
import { Collection } from './Collection';
export interface UserProps {
  name?: string;
  age?: number;
  id?: number; //if there's id, the user has been persisted in db.json
}

const rootURL = 'http://localhost:3000/users';
export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootURL)
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootURL, (json: UserProps) =>
      User.buildUser(json)
    );
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
}
