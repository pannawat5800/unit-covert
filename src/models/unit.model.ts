
export type Unit = {
    prefix: string,
    is_unit_value: number,
}

// export type SystemUnit = {
//     context: string,
//     metric_is: Unit,
//     customized: Unit,
//     imperial: Unit,
// }

export type SystemUnit = {
    context: string,
    group_type: string,
    unit: string,
    IS_value: number,
    IS_unit: string
}



