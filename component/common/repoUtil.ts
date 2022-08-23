import IEntity from "./ientity";

export default class RepoUtil<T extends IEntity>
{
    key:string;
    getDefault?: () => T[];
    create: ()=> T;

    constructor(key:string, create: ()=> T)
    {
        this.create = create;
        this.key = key;
        this.getDefault = undefined;
    }

    async get(): Promise<T[]>
    {
        await new Promise((e,r)=> setTimeout(e, 0));
        this.fillDefault();
        
        let usersStr = localStorage.getItem(this.key);
        let entities: T[] = [];

        if(usersStr != undefined)
        {
            let parsedEntities: [] = JSON.parse(usersStr);
            entities = parsedEntities.map(e => {
                let obj = this.create();
                return Object.assign(obj, e)
            });
        }

        return entities;
    }

    async getById(id:string):Promise<T>{
        let entities = await this.get()

        for(var entity of entities)
            if(entity.id === id)
                return entity;

        throw new Error("Entity with id " + id + " not found");
    }

    async update(id:string, obj: T):Promise<void>
    {
        await new Promise((e,r)=> setTimeout(e, 0));

        let entities = await this.get();
        let newEntities = entities.map(e => {
            if(e.id == id)
                return obj;
        
            return e;
        });

        console.log(newEntities);
        this.save(newEntities);
    }

    private fillDefault()
    {
        if(this.getDefault === undefined)
            return;

        let usersStr = localStorage.getItem(this.key);

        if(usersStr === null || usersStr === undefined)
        {
            let entities = this.getDefault();
            this.save(entities);
        }
    }

    private save(entities: T[])
    {
        let json = JSON.stringify(entities);
        localStorage.setItem(this.key, json);
    }

}
