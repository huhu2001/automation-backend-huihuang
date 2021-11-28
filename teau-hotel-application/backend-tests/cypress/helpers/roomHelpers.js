
const faker = require('faker')

function showAllrooms(cy){

    cy.authenticateSession().then((Response =>{
        cy.request({
           method: "GET",
           url: "http://localhost:3000/api/rooms",
           headers:{
               'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
               'Content-Type': 'application/json'
           },
       }).then((Response =>{
           cy.log(Response.body)
       }))
   }))
}

function createRandomRoomPayload(){
    const payload = {
    "category": 'double',
    "created": faker.date.recent(),
    "floor": faker.datatype.number({
        'min':1,
        'max':12
    }),
    "number": faker.datatype.number({
        'min':101,
        'max':1206
    }),
    "available": true,
    "price": faker.datatype.number({
        'min':500,
        'max':5000
    }),
    "features": ['balcony']
    }

    return payload
}

var roomId
var resBody
function creatNewRoom(cy){
        cy.authenticateSession().then((Response =>{
            let fakeRandomPayload = createRandomRoomPayload()
            cy.request({
               method: "POST",
               url: "http://localhost:3000/api/room/new",
               headers:{
                   'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                   'Content-Type': 'application/json'
               },
               body:fakeRandomPayload
           }).then((Response =>{
               cy.log(Response.body.id)
               cy.log(Response.body.created)
               cy.log(Response.body.length)
        
               roomId = Response.body.id
               resBody = Response.body  
            }))
        }))
}
    

function updateRandomRoomPayload(id,date){
    const payload = {
    "category":'single',
    "id":id,
    "created": date,
    "floor":faker.datatype.number({
        'min':1,
        'max':12
    }),
    "number":faker.datatype.number({
        'min':101,
        'max':1206
    }),
    "available":true,
    "price":faker.datatype.number({
        'min':500,
        'max':5000
    }),
    "features":['Sea View']
    }

    return payload
}


function updateRandomRoom(cy){
    cy.authenticateSession().then((Response =>{
            cy.request({
               method: "PUT",
               url: "http://localhost:3000/api/room/" + roomId,
               headers:{
                   'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                   'Content-Type': 'application/json'
               },
               body: 
               {
                "category":resBody.category,
                "floor":resBody.floor,
                "id":roomId,
                "number":resBody.number + 1,
                "available":resBody.available,
                "price":resBody.price,
                "features":resBody.features,
               }
           }).then((Response =>{
            //    cy.log(Response.body)
            //    expect(JSON.stringify(Response.body)).to.eq(JSON.stringify(lastRoomPayload))
               expect(Response.status).to.eq(200)
               const responseAsString = JSON.stringify(Response)
               cy.log(responseAsString)
               cy.log('Room created with id:' + Response.body.id)
            }))
        }))
}

function deleteRoom(cy) {
    cy.authenticateSession().then((Response =>{
        //  let lastId = Response.body[Response.body.length -1].id
        cy.request({
            method: "DELETE",
            url: 'http://localhost:3000/api/room/'+ roomId,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((Response =>{
            const responseAsString = JSON.stringify(Response)
            cy.log(responseAsString)
            
        }))
    }))
}


function deleteAllrooms(cy){
    var roomNum
    cy.authenticateSession().then((Response =>{
        cy.request({
           method: "GET",
           url: "http://localhost:3000/api/rooms",
           headers:{
               'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
               'Content-Type': 'application/json'
           },
       }).then((Response =>{
           cy.log(Response.body.length)
           roomNum = Response.body.length
           for (var i = 1; i<= roomNum; i++) {
            cy.request({
                method: "DELETE",
                url: "http://localhost:3000/api/room/" + i,
                headers:{
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                }
            })
           }
       }))
       
    
    }))
}

module.exports ={
    showAllrooms,
    creatNewRoom,
    updateRandomRoom,
    deleteRoom,
    deleteAllrooms,
    createRandomRoomPayload,
    updateRandomRoomPayload 
}