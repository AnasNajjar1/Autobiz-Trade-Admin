exports.vehSchema = {
  type: "object",
  description: "Data content for b2b plateform",
  properties: {
    fileNumber: {
      type: "string",
      name: "string" // Edit Marceau
    },
    salesInfos: {
      type: "object",
      properties: {
        purchaseDate: {
          type: "string",
          pattern: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$",
          name: "date"
        },
        status: {
          type: "integer",
          name: "array",
          $ref: "statusChoices" // Edit Marceau
        },
        type: {
          type: "string",
          enum: ["stock", "private"], // Edit Marceau
          name: "array" // Edit Marceau
        },
        minimalPrice: {
          type: "integer",
          name: "int"
        },
        salesDateTimeEnd: {
          type: "string",
          name: "datetime"
        },
        partnersAuthorized: {
          type: "array",
          enum: ["Lorem", "Ipsum"], // Edit Marceau
          name: "array"
        },
        salesComment: {
          type: "string",
          name: "text" // Edit Marceau
        }
      },
      required: []
    },
    vehicle: {
      type: "object",
      properties: {
        brandLabel: {
          type: "string",
          name: "string"
        },
        brandId: {
          type: "integer",
          name: "int"
        },
        modelId: {
          type: "integer",
          name: "int"
        },
        modelLabel: {
          type: "string",
          name: "string"
        },
        versionLabel: {
          type: "string",
          name: "string"
        },
        versionId: {
          type: "integer",
          name: "int"
        },
        firstRegistrationDate: {
          type: "string",
          pattern: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$",
          name: "date"
        },
        profileCosts: {
          type: "string",
          enum: ["A", "B", "C", "D", "E"],
          name: "array"
        },
        carPictures: {
          type: "object",
          properties: {
            left_side_picture: {
              type: "string",
              name: "string", // Edit Marceau
              pattern: "^https*://.*\\.[a-z]{2,3}"
            },
            front_picture: {
              type: "string",
              name: "string", // Edit Marceau
              pattern: "^https*://.*\\.[a-z]{2,3}"
            },
            right_side_picture: {
              type: "string",
              name: "string", // Edit Marceau
              pattern: "^https*://.*\\.[a-z]{2,3}"
            },
            back_picture: {
              type: "string",
              name: "string", // Edit Marceau
              pattern: "^https*://.*\\.[a-z]{2,3}"
            },
            motor_picture: {
              type: "string",
              name: "string", // Edit Marceau
              pattern: "^https*://.*\\.[a-z]{2,3}"
            },
            trunk_picture: {
              type: "string",
              name: "string", // Edit Marceau
              pattern: "^https*://.*\\.[a-z]{2,3}"
            },
            inside_front_picture: {
              type: "string",
              name: "string", // Edit Marceau
              pattern: "^https*://.*\\.[a-z]{2,3}"
            },
            dashboard_picture: {
              type: "string",
              name: "string", // Edit Marceau
              pattern: "^https*://.*\\.[a-z]{2,3}"
            },
            inside_back_picture: {
              type: "string",
              name: "string", // Edit Marceau
              pattern: "^https*://.*\\.[a-z]{2,3}"
            },
            counter_picture: {
              type: "string",
              name: "string", // Edit Marceau
              pattern: "^https*://.*\\.[a-z]{2,3}"
            },
            vin_picture: {
              type: "string",
              name: "string", // Edit Marceau
              pattern: "^https*://.*\\.[a-z]{2,3}"
            },
            purchase_invoice_picture: {
              type: "string",
              name: "string", // Edit Marceau
              pattern: "^https*://.*\\.[a-z]{2,3}"
            },
            purchase_invoice_picture2: {
              type: "string",
              name: "string", // Edit Marceau
              pattern: "^https*://.*\\.[a-z]{2,3}"
            }
          }
        }
      },
      required: [
        "brandLabel",
        "brandId",
        "modelId",
        "versionLabel",
        "versionId",
        "firstRegistrationDate",
        "profileCosts",
        "carPictures"
      ]
    },
    pointOfSale: {
      type: "object",
      properties: {
        pointOfSaleName: {
          type: "string",
          name: "string"
        },
        zipCode: {
          type: "string",
          name: "string",
          pattern: "^[0-9]{5}$" // Edit Marceau
        },
        city: {
          type: "string",
          name: "string"
        },
        country: {
          type: "string",
          name: "string"
        }
      },
      required: ["pointOfSaleName", "zipCode", "city", "country"]
    },
    keyPoints: {
      type: "object",
      properties: {
        keyPoints: {
          type: "array",
          enum: [
            "firstHand",
            "vat",
            "servicingInBrandNetwork",
            "origin",
            "7seats",
            "readyToBuy",
            "fewCosts",
            "smallPrice",
            "ctLessThan6Months",
            "purchaseInvoice"
          ],
          name: "array"
        }
      },
      required: ["keyPoints"]
    },
    documents: {
      type: "object",
      properties: {
        documents: {
          type: "object",
          name: "iterator", // Edit Marceau
          properties: {
            // Edit Marceau
            title: {
              type: "string",
              name: "string"
            },
            link: {
              type: "string",
              name: "string",
              pattern: "^https*://.*\\.[a-z]{2,3}"
            }
          }
        }
      },
      required: [] // Edit Marceau
    },
    declaredEquipments: {
      type: "object",
      properties: {
        equipments: {
          type: "array",
          enum: [
            "leather_seat",
            "sunroof",
            "gps",
            "speed_regulator",
            "parking_assistance",
            "auto_ac"
          ],
          name: "array"
        }
      },
      required: ["equipments"]
    },
    characteristics: {
      type: "object",
      properties: {
        mileage: {
          type: "integer",
          name: "int"
        },
        fuelLabel: {
          type: "string",
          name: "string"
        },
        fuelId: {
          type: "integer",
          name: "array",
          $ref: "fuelChoices" // Edit Marceau
        },
        liter: {
          type: "number",
          name: "number"
        },
        gearBoxLabel: {
          type: "string",
          name: "string"
        },
        gearBoxId: {
          type: "integer",
          name: "array",
          $ref: "gearChoices" // Edit Marceau
        },
        seats: {
          type: "string",
          name: "string"
        },
        door: {
          type: "string",
          name: "string"
        },
        ch: {
          type: "integer",
          name: "int"
        },
        kw: {
          type: "integer",
          name: "int"
        },
        fiscal: {
          type: "integer",
          name: "int"
        },
        wheelsFrontDimensions: {
          type: "object",
          properties: {
            width: {
              enum: [
                "",
                "155",
                "165",
                "175",
                "185",
                "195",
                "205",
                "215",
                "225",
                "235",
                "245",
                "255",
                "265",
                "275",
                "285",
                "295"
              ]
            },
            height: {
              enum: [
                "",
                "30",
                "35",
                "40",
                "45",
                "50",
                "55",
                "60",
                "65",
                "70",
                "75",
                "80"
              ]
            },
            diameter: {
              enum: [
                "",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19",
                "20",
                "21",
                "22"
              ]
            }
          },
          name: "rimSize"
        },
        wheelsBackDimensions: {
          type: "object",
          properties: {
            width: {
              enum: [
                "",
                "155",
                "165",
                "175",
                "185",
                "195",
                "205",
                "215",
                "225",
                "235",
                "245",
                "255",
                "265",
                "275",
                "285",
                "295"
              ]
            },
            height: {
              enum: [
                "",
                "30",
                "35",
                "40",
                "45",
                "50",
                "55",
                "60",
                "65",
                "70",
                "75",
                "80"
              ]
            },
            diameter: {
              enum: [
                "",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19",
                "20",
                "21",
                "22"
              ]
            }
          },
          name: "rimSize"
        },
        rimTypeFront: {
          type: "string",
          name: "string"
        },
        rimTypeBack: {
          type: "string",
          name: "string"
        },
        metallic: {
          type: "boolean",
          name: "boolean"
        }
      },
      required: [
        "mileage",
        "fuelLabel",
        "liter",
        "gearBoxLabel",
        "gearBoxId",
        "seats",
        "door",
        "ch",
        "kw",
        "fiscal",
        "wheelsFrontDimensions",
        "wheelsBackDimensions",
        "rimTypeFront",
        "rimTypeBack"
      ]
    },
    administrativeDetails: {
      type: "object",
      properties: {
        gcDate: {
          type: "string",
          pattern: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$",
          name: "date"
        },
        firstHand: {
          type: "boolean",
          name: "boolean"
        },
        vehicleType: {
          type: "string",
          name: "string"
        },
        co2: {
          type: "string",
          name: "string"
        }
      },
      required: ["gcDate", "vehicleType", "co2"]
    },
    history: {
      type: "object",
      properties: {
        servicingHistory: {
          type: "string",
          name: "string"
        },
        nextTechnicalCheckDate: {
          type: "string",
          pattern: "^[0-9]{4}-[0-9]{2}$",
          name: "month"
        },
        lastservicingDate: {
          type: "string",
          pattern: "^[0-9]{4}-[0-9]{2}$",
          name: "month"
        },
        servicingInBrandNetwork: {
          type: "boolean",
          name: "boolean"
        },
        purchaseInvoice: {
          type: "string",
          pattern: "^https*://.*\\.[a-z]{2,3}",
          name: "image"
        },
        vat: {
          type: "boolean",
          name: "boolean"
        }
      },
      required: [
        "servicingHistory",
        "nextTechnicalCheckDate",
        "lastservicingDate",
        "purchaseInvoice"
      ]
    },
    constructorEquipments: {
      type: "object",
      properties: {
        constructorEquipments: {
          type: "array",
          name: "array",
          enum: [
            "Direction assistée",
            "Volant Multifonctions",
            "Peinture métalisée"
          ]
        }
      },
      required: []
    },
    market: {
      type: "object",
      properties: {
        link: {
          type: "string",
          pattern: "^https*://.*\\.[a-z]{2,3}",
          name: "url"
        },
        b2cMarketValue: {
          type: "string",
          name: "string"
        },
        standardMileage: {
          type: "string",
          name: "string"
        }
      },
      required: []
    }
  },

  required: [
    "fileNumber",
    "vehicle",
    "pointOfSale",
    "keyPoints",
    "documents",
    "declaredEquipments",
    "characteristics",
    "administrativeDetails",
    "history"
  ]
};
