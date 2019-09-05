exports.vehSchema = {
    "fileNumber": {
        "type": "string"
    },
    "salesInfo": {
        "status": {
            "type": "int"
        },
        "type": {
            "type": "string"
        },
        "minimalPrice": {
            "type": "int"
        }
    },
    "vehicle": {
        "brandLabel": {
            "type": "string"
        },
        "brandId": {
            "type": "int"
        },
        "modelLabel": {
            "type": "string"
        },
        "modelId": {
            "type": "int"
        },
        "versionLabel": {
            "type": "string"
        },
        "versionId": {
            "type": "int"
        },
        "firstRegistrationDate": {
            "type": "date"
        },
        "fuelLabel": {
            "type": "string"
        },
        "fuelId": {
            "type": "int"
        },
        "mileage": {
            "type": "int"
        },
        "profileCosts": {
            "type": "string"
        },
        "carPictures": {
            "type": "object"
        }
    },
    "pointOfSale": {
        "pointOfSaleName": {
            "type": "string"
        },
        "zipCode": {
            "type": "string"
        },
        "city": {
            "type": "string"
        },
        "country": {
            "type": "string"
        }
    },
    "keyPoints": {
        "type": "array"
    },
    "documents": {
        "type": "object"
    },
    "equipments": {
        "type": "array"
    },
    "characteristics": {
        "liter": {
            "type": "number"
        },
        "gearBoxLabel": {
            "type": "string"
        },
        "gearBoxId": {
            "type": "int"
        },
        "seats": {
            "type": "string"
        },
        "door": {
            "type": "string"
        },
        "kw": {
            "type": "int"
        },
        "fiscal": {
            "type": "int"
        },
        "wheelsFrontDimensions": {
            "type": "object"
        },
        "wheelsBackDimensions": {
            "type": "object"
        },
        "rimTypeFront": {
            "type": "string"
        },
        "rimTypeBack": {
            "type": "string"
        },
        "metallic": {
            "type": "boolean"
        }
    },
    "administrativeDetails": {
        "gcDate": {
            "type": "date"
        },
        "firstHand": {
            "type": "boolean"
        },
        "vehicleType": {
            "type": "string"
        },
        "cO2": {
            "type": "string"
        }
    },
    "market": {
        "link": "",
        "b2cMarketValue": {
            "type": "string"
        },
        "standardMileage": {
            "type": "string"
        }
    },
    "history": {
        "servicingHistory": {
            "type": "string"
        },
        "nextTechnicalCheckDate": {
            "type": "month"
        },
        "lastServicingDate": {
            "type": "month"
        },
        "servicingInBrandNetwork": {
            "type": "boolean"
        },
        "invoice": {
            "type": "image"
        },
        "vat": {
            "type": "boolean"
        }
    },
    "constructorsEquipments": {
        "type": "array"
    }
}