import { ICategoryRepository } from 'database-abstraction-layer';
import { Category, copy } from 'music-app-models';
import { JsonDB } from './json-handling/json-handling';

export class CategoryRepository implements ICategoryRepository {
    jsonDb: JsonDB;

    constructor(jsonDb: JsonDB){
        this.jsonDb = jsonDb;
    }

    add(instance: Category): boolean {
        if(this.jsonDb.categories.find(c => c.name == instance.name))
            return false;
        
        const newCategory = new Category();
        Object.assign(newCategory, instance);

        this.jsonDb.categories.push(newCategory);
        this.jsonDb.saveChanges();

        return true;
    }

    update(instance: Category): boolean {
        return false;
    }


    delete(instance: Category): boolean {
        const category = this.jsonDb.categories.find(c => c.name == instance.name);

        if(!category)
            return false;
        
        this.jsonDb.categories = this.jsonDb.categories.filter(
            c => c.name != category.name
        );

        this.jsonDb.saveChanges();

        return true;
    }

    getAll(): Category[] {
        return this.jsonDb.categories.map(copy);
    }
}