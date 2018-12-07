declare function mongoService(arg: any): any;
declare module mongoService {}
declare module "feathers-mongodb" {
    export = mongoService;
}