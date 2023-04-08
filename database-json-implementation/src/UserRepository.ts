import { IUserRepository } from 'database-abstraction-layer';
import { User, copy } from 'music-app-models';
import { JsonDB } from './json-handling/json-handling';

export class UserRepository implements IUserRepository {
    jsonDb: JsonDB;

    constructor(jsonDb: JsonDB){
        this.jsonDb = jsonDb;
    }

    getByEmail(email: string): User {
        return copy(this.jsonDb.users.find(u => u.email == email));
    }

    add(instance: User): boolean {
        if(this.jsonDb.users.find(u => u.email == instance.email))
            return false;
        

        const newUser = new User();
        Object.assign(newUser, instance);

        this.jsonDb.users.push(newUser);
        this.jsonDb.saveChanges();

        return true;
    }

    update(instance: User): boolean {
        let usr = this.jsonDb.users.find(u => u.email == instance.email);

        if(!usr)
            return false;
        
        Object.assign(usr, instance);
        this.jsonDb.saveChanges();
        
        return true;
    }

    delete(instance: User): boolean {
        const user = this.jsonDb.users.find(u => u.email == instance.email)
        
        if(!user)
            return false;

        this.jsonDb.users = this.jsonDb.users.filter(u => u.email != instance.email);
        this.jsonDb.saveChanges();

        return true;
    }

    getAll(): User[] {
        return this.jsonDb.users.map(copy);
    }

}