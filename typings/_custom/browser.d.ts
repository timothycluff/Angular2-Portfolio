/**
 * Created by tim.cluff on 4/7/2017.
 */

interface ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
    observe(target: any, callback: Function, acceptList?: Array<any>): void;
}
