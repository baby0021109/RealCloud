// Use this file only as a guide for first steps. Delete it when you have added your own routes files.
// For a detailed explanation regarding each routes property, visit:
// https://mocks-server.org/docs/get-started-routes

const HISTORIES = [
	{
		"peopleSearchId":27627,
		"email":null,
		"phone":null,
		"firstName":"Emmanuel",
		"lastName":"Lao",
		"middleName":null,
		"countryCode":"US",
		"stateCode":"",
		"city":null,
		"userName":null,
		"age":null
	},
	{
		"peopleSearchId":27626,
		"email":null,
		"phone":null,
		"firstName":"Johnathan",
		"lastName":"Stevens",
		"middleName":null,
		"countryCode":"US",
		"stateCode":"",
		"city":null,
		"userName":null,
		"age":null
	},
	{
		"peopleSearchId":25626,
		"email":null,
		"phone":null,
		"firstName":"Kent",
		"lastName":"Olmstead",
		"middleName":null,
		"countryCode":"US",
		"stateCode":"",
		"city":null,
		"userName":null,
		"age":null
	},
	{
		"peopleSearchId":25625,
		"email":null,
		"phone":null,
		"firstName":"Peter",
		"lastName":"Crabtree",
		"middleName":null,
		"countryCode":"US",
		"stateCode":"",
		"city":null,
		"userName":null,
		"age":null
	},
	{
		"peopleSearchId":25350,
		"email":null,
		"phone":null,
		"firstName":"Matthew",
		"lastName":"Blackmon",
		"middleName":null,
		"countryCode":"US",
		"stateCode":"",
		"city":null,
		"userName":null,
		"age":null
	}
]


module.exports = [
  {
    id: "get-histories", // id of the route
    url: "/api/histories", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // id of the variant
        response: {
          status: 200, // status to send
          body: HISTORIES, // body to send
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
  {
    id: "get-history", // id of the route
    url: "/api/histories/:id", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // id of the variant
        response: {
          status: 200, // status to send
          body: HISTORIES[0], // body to send
        },
      },
      {
        id: "real", // id of the variant
        response: (req, res) => {
          const hisID = req.params.id;
          const history = HISTORIES.find((hisdata) => hisdata.peopleSearchId === Number(hisID));
          if (history) {
            res.status(200);
            res.send(history);
          } else {
            res.status(404);
            res.send({
              message: "history not found",
            });
          }
        },
      },
    ],
  },
];
