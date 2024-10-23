import { Controller, Post, Body, Param } from '@nestjs/common';
import { sort } from "@beacon/codeable"
import demo from "./demo.json"

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
        )

        return a
    }
}
