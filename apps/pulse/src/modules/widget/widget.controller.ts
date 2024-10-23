import { Controller, Post, Body, Param } from '@nestjs/common';
import { sort } from "@beacon/codeable"
import demo from "./demo.json"

function isNotNullValue(val) {
    if (!val) {
        if (Number.isNaN(val) || val === null || val === undefined) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}


@Controller({
    path: '/widget'
})
export class WidgetController {
    public constructor() { }

    @Post(":id/pie")
    public async getPieConfig(@Param('id') id: string, @Body() body: any) {
        let a = sort(
            demo.data,
            (a, b) => (a[demo.config.valueFieldsNameMeasureX] + '').localeCompare(b[demo.config.valueFieldsNameMeasureX] + ''),
            (groupItem)=>{
                let areaName = isNotNullValue(groupItem[demo.config.valueFieldsNameMeasuresubX]) ? groupItem[demo.config.valueFieldsNameMeasuresubX] : null
                return { value: groupItem[demo.config.valueFieldsNameMeasureY], name: areaName }
            }
        )

        return a
    }
}
