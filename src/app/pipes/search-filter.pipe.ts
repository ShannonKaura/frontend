import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
    name: "searchFilter"
})

export class searchFilterPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        if (!value) return null;
        if (!args) return value;

        args = args.toLowerCase();
        // debugger;

        return value.filter((item: any) => {
            return JSON.stringify(item).toLowerCase().includes(args)
        })
    }

}
