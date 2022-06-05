const MYPROPERIES = [
  {
    "propertyId": 53910,
    "address": "3697 Hampton Brook Dr, Hamburg, NY, 14075",
    "zip": "14075",
    "longitude": -78.84808,
    "latitude": 42.704613,
    "yearBuilt": 1952,
    "bedroomsCount": 3,
    "bathCount": 2,
    "isOwnerDeepInfoPurchased": false,
    "propertyNote": null,
    "followupNote": null,
    "owners": [
      "DAVID J SABUDA",
      "MARCY A SABUDA"
    ]
  },
  {
    "propertyId": 45501097,
    "address": "201 N Crescent Dr, Beverly Hills, CA, 90210",
    "zip": "90210",
    "longitude": -118.397616,
    "latitude": 34.068543,
    "yearBuilt": 2005,
    "bedroomsCount": 0,
    "bathCount": 0,
    "isOwnerDeepInfoPurchased": true,
    "propertyNote": null,
    "followupNote": null,
    "owners": [
      "CNL RETIREMENT SUN 1 BEVERLY",
      "CA HILLS"
    ]
  },
  {
    "propertyId": 45542199,
    "address": "203 N Elm Dr, Beverly Hills, CA, 90210",
    "zip": "90210",
    "longitude": -118.395144,
    "latitude": 34.069547,
    "yearBuilt": 1985,
    "bedroomsCount": 4,
    "bathCount": 4,
    "isOwnerDeepInfoPurchased": false,
    "propertyNote": null,
    "followupNote": null,
    "owners": [
      "ROSENROTH,MASZA & J TRUST"
    ]
  },
  {
    "propertyId": 45586513,
    "address": "205 N Elm Dr, Beverly Hills, CA, 90210",
    "zip": "90210",
    "longitude": -118.395145,
    "latitude": 34.069684,
    "yearBuilt": 1923,
    "bedroomsCount": 3,
    "bathCount": 1,
    "isOwnerDeepInfoPurchased": true,
    "propertyNote": null,
    "followupNote": null,
    "owners": [
      "NEGAR MOUSAZADEH",
      "PEDRAM SOLEIMANI"
    ]
  },
  {
    "propertyId": 45801796,
    "address": "210 Foothill Rd, Beverly Hills, CA, 90210",
    "zip": "90210",
    "longitude": -118.395717,
    "latitude": 34.070096,
    "yearBuilt": 1922,
    "bedroomsCount": 2,
    "bathCount": 2,
    "isOwnerDeepInfoPurchased": false,
    "propertyNote": null,
    "followupNote": null,
    "owners": [
      "EMMANUEL FRED F & TOURAN T"
    ]
  },
  {
    "propertyId": 45811551,
    "address": "207 N Elm Dr, Beverly Hills, CA, 90210",
    "zip": "90210",
    "longitude": -118.395145,
    "latitude": 34.069822,
    "yearBuilt": 1927,
    "bedroomsCount": 6,
    "bathCount": 4,
    "isOwnerDeepInfoPurchased": false,
    "propertyNote": null,
    "followupNote": null,
    "owners": [
      "SITOWITZ,MYRTLE TRUST"
    ]
  },
  {
    "propertyId": 46505797,
    "address": "514 Palisades Ave, Santa Monica, CA, 90402",
    "zip": "90402",
    "longitude": -118.503879,
    "latitude": 34.026281,
    "yearBuilt": 1911,
    "bedroomsCount": 5,
    "bathCount": 4,
    "isOwnerDeepInfoPurchased": true,
    "propertyNote": null,
    "followupNote": null,
    "owners": [
      "VICTOR FRESCO",
      "DIANE FRESCO"
    ]
  },
  {
    "propertyId": 54190124,
    "address": "8088 Santa Inez Way, Buena Park, CA, 90620",
    "zip": "90620",
    "longitude": -118.007736,
    "latitude": 33.846306,
    "yearBuilt": 1964,
    "bedroomsCount": 3,
    "bathCount": 1,
    "isOwnerDeepInfoPurchased": false,
    "propertyNote": null,
    "followupNote": null,
    "owners": [
      "FAIROUZ YOUSSEF",
      "LOUIS NASHED"
    ]
  },
  {
    "propertyId": 76372931,
    "address": "1037 S Holt Ave, Los Angeles, CA, 90035",
    "zip": "90035",
    "longitude": -118.37859699999998,
    "latitude": 34.058206,
    "yearBuilt": 1957,
    "bedroomsCount": 0,
    "bathCount": 0,
    "isOwnerDeepInfoPurchased": false,
    "propertyNote": null,
    "followupNote": null,
    "owners": [
      "TAFF,PHILIP D TRUST"
    ]
  }
];

module.exports = [
  {
    id: "get-myproperties", // id of the route
    url: "/api/myproperties", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // id of the variant
        response: {
          status: 200, // status to send
          body: MYPROPERIES, // body to send
        },
      },
      {
        id: "error", // id of the variant
        response: {
          status: 400, // status to send
          body: {
            // body to send
            message: "Error",
          },
        },
      },
    ],
  },
  //   {
  //     id: "get-history", // id of the route
  //     url: "/api/histories/:id", // url in express format
  //     method: "GET", // HTTP method
  //     variants: [
  //       {
  //         id: "success", // id of the variant
  //         response: {
  //           status: 200, // status to send
  //           body: HISTORIES[0], // body to send
  //         },
  //       },
  //       {
  //         id: "real", // id of the variant
  //         response: (req, res) => {
  //           const hisID = req.params.id;
  //           const history = HISTORIES.find(
  //             (hisdata) => hisdata.peopleSearchId === Number(hisID)
  //           );
  //           if (history) {
  //             res.status(200);
  //             res.send(history);
  //           } else {
  //             res.status(404);
  //             res.send({
  //               message: "history not found",
  //             });
  //           }
  //         },
  //       },
  //     ],
  //   },
];