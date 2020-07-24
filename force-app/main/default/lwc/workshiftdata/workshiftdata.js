import { LightningElement } from 'lwc';
export const workshifts = [
    {
        "date":"2020/07/01",
        "Rounders":[
            {
                "roundercode":"001",
                "name":"太郎",
                "SubmitedWorkShifts":[
                    {
                        "shiftcode":"111111",
                        "workDay__c":"2020-07-01",
                        "availableStartingTime__c":"10:00:00.000Z",
                        "availableEndingTime__c":"18:00:00.000Z"
                    }
                ],
                "Demands":[
                    {
                        "shiftcode__c":"211111",
                        "shopName__c":"マツキヨ",
                        "workDay__c":"2020-07-01",
                        "startingTime__c":"09:00:00.000Z",
                        "endingTime__c":"12:00:00.000Z"
                    },
                    {
                        "shiftcode__c":"211112",
                        "shopName__c":"ダイコク",
                        "workDay__c":"2020-07-01",
                        "startingTime__c":"13:00:00.000Z",
                        "endingTime__c":"18:00:00.000Z"
                    }
                ]

            },
            {
                "roundercode":"002",
                "name":"次郎",
                "SubmitedWorkShifts":[
                    {
                        "shiftcode":"11111２",
                        "workDay__c":"2020-07-01",
                        "availableStartingTime__c":"09:00:00.000Z",
                        "availableEndingTime__c":"18:00:00.000Z"
                    }
                ],
                "Demands":[
                    {
                        "shiftcode__c":"311111",
                        "shopName__c":"ローソン",
                        "workDay__c":"2020-07-01",
                        "startingTime__c":"12:00:00.000Z",
                        "endingTime__c":"13:00:00.000Z"
                    },
                    {
                        "shiftcode__c":"311112",
                        "shopName__c":"セブンイレブン",
                        "workDay__c":"2020-07-01",
                        "startingTime__c":"15:00:00.000Z",
                        "endingTime__c":"18:00:00.000Z"
                    }
                ]

            }
        ]
    }    
]