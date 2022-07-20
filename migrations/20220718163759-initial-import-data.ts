const datas = [
  // Distance
  {
    context: "distance",
    group_type: "Imperial",
    unit: "mile",
    IS_value: 1.609344,
    IS_unit: "meter"
  },
  {
    context: "distance",
    group_type: "Metric_SI",
    unit: "meter",
    IS_value: 1,
    IS_unit: "meter"
  },
  {
    context: "distance",
    group_type: "Customized",
    unit: "wa",
    IS_value: 2,
    IS_unit: "meter"
  },
  // Area
  {
    context: "area",
    group_type: "Imperial",
    unit: "acre",
    IS_value: 4046.8,
    IS_unit: "m2"
  },
  {
    context: "area",
    group_type: "Metric_SI",
    unit: "m2",
    IS_value: 1,
    IS_unit: "m2"
  },
  {
    context: "area",
    group_type: "Customized",
    unit: "rai",
    IS_value: 1600,
    IS_unit: "m2"
  },
  // Volumn
  {
    context: "volume",
    group_type: "Imperial",
    unit: "fl oz.",
    IS_value: 2.95735296 * Math.pow(10, -5),
    IS_unit: "m3"
  },
  {
    context: "volume",
    group_type: "Metric_SI",
    unit: "m3",
    IS_value: 1,
    IS_unit: "m3"
  },
  {
    context: "volume",
    group_type: "Customized",
    unit: "mL",
    IS_value: 1000000,
    IS_unit: "m3"
  },
  // Speed
  {
    context: "speed",
    group_type: "Imperial",
    unit: "mph",
    IS_value: 2.2369362921,
    IS_unit: "m/s"
  },
  {
    context: "speed",
    group_type: "Metric_SI",
    unit: "m/s",
    IS_value: 1,
    IS_unit: "m/s"
  },
  {
    context: "speed",
    group_type: "Customized",
    unit: "km/h",
    IS_value: 3.6,
    IS_unit: "m/s"
  }
]
module.exports = {
  async up(db, client) {
    await Promise.all(datas.map((data) => {
      return db.collection("system_units").findOneAndUpdate({
        "context": data.context,
        "unit": data.unit,
      },
      {
        $set: { ...data, date_create: new Date(), date_update: new Date() },
      },
      { upsert: true })
    }))
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
