import { bench } from "vitest"

import { sort } from "../src"
import demo from "./demo.json"

bench('sort (large array)', () => {
    const input = Array.from({ length: 100000 }, () => Math.floor(Math.random() * 100000));
    const sorted = sort(input, (a, b) => a - b) as number[];
})

bench('native sort (large array)', () => {
    const input = Array.from({ length: 100000 }, () => Math.floor(Math.random() * 100000));
    const sorted = input.sort((a, b) => a - b) as number[];
})


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

bench('cui sort (large array)', () => {
    let a: any[] = []

    let data = JSON.parse(JSON.stringify(demo.data))

    data = data.sort((a, b) => {
        return (a[demo.config.valueFieldsNameMeasureX] + '').localeCompare(b[demo.config.valueFieldsNameMeasureX] + '')
    })

    for (var i = 0; i < data.length; i++) {
        const groupItem = data[i]
        let areaName = isNotNullValue(groupItem[demo.config.valueFieldsNameMeasuresubX]) ? groupItem[demo.config.valueFieldsNameMeasuresubX] : null
        a.push({ value: groupItem[demo.config.valueFieldsNameMeasureY], name: areaName })
    }
})

bench('a sort (large array)', () => {
    let data = JSON.parse(JSON.stringify(demo.data))

    sort(
        data,
        (a: any, b: any) => (a[demo.config.valueFieldsNameMeasureX] + '').localeCompare(b[demo.config.valueFieldsNameMeasureX] + ''),
    )
})