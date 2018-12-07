declare function memory(): any;
declare module memory {}
declare module "feathers-memory" {
    export = memory;
}
declare module "@feathersjs/errors/handler" {
    export = memory;
}
declare module "@feathersjs/express/rest" {
    export = memory;
}