export default class RepoUtil<T>
{
    key:string;

    constructor(key:string)
    {
        this.key = key;
    }

    async get(getDefault?: ()=> T[]): Promise<T[]>
    {
        await new Promise((e,r)=> setTimeout(e, 0));
        
        let usersStr = localStorage.getItem(this.key);

        if(usersStr === undefined  || usersStr === null)
        {
            if(getDefault !== undefined)
            {
                return getDefault();
            }
        }

        return [];
    }
}