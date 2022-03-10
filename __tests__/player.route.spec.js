const userController = require("../app/controllers/user.controller")
const request = require("supertest")
const {app} = require("../app")
const { response } = require("express")

describe('Test User Controller', () => { 

    jest.useRealTimers();

    describe('Test all routes', () => {  
        // positive test
        // test("[Positive] Create player with hardcode data" , async () => {
        //     // tiap habis test angka 1 nya tambahin lagi. itu user udh ke create soalnya
        //     const username = "testjest11111"
        //     const email = "testjest11111@test.com"
        //     const password = "testjest11111"
        //     const name = "testjest11111"
        //     await request(app)
        //     .post("/api/players")
        //     .send({
        //         username:username,
        //         password:password,
        //         email:email,
        //         name:name
        //     })
        //     .expect(200)
        //     .then((response)=>{
        //         expect(response.body.result).toBe("SUCCESS")
        //     })
        // },20000)

        test('[Positive] Get All Players from database', async()=>{
            await request(app)
            .get("/api/players")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then((response)=>{
                expect(response.statusCode).toBe(200)
                expect(response.body.result).toBe("SUCCESS")
            })
        })

        test("[Positive] Login with correct username and password", async()=>{
            await request(app)
            .post("/api/login")
            .send({username:"testfaris",password:"12341234"})
            .expect(200)
            .then((response)=>{
                expect(response.body.result).toBe("SUCCESS")
                expect(response.body.name).toBe("testfaris")
            })
        })
        
        test("[Positive] Get data player by id", async() => {
            const id ="2"
            await request(app)
            .get(`/api/players/${id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.result).toBe("SUCCESS")
                expect(response.body.message.id).toBe(parseInt(id))
            })
        })

        test("[Positive] Get history data player by id", async() => {
            const id ="1"
            await request(app)
            .get(`/api/history/${id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.result).toBe("SUCCESS")
            })
        })

        test("[Positive] Update user name ", async() => {
            const id ="2"
            await request(app)
            .put(`/api/players/${id}`)
            .send({username:"testadam"})
            .expect(200)
            .then((response) => {
                expect(response.body.result).toBe("SUCCESS")
                expect(response.body.message).toBe("Player was updated successfully.")
            })
        })

        test("[Positive] Create new game history", async()=>{
            await request(app)
            .post("/api/score")
            .send({
                user_id:1,
                game_id:1,
                result:"WIN",
                score:1,
                game_date: Date.now()
            })
            .expect(201)
            .then((response)=>{
                expect(response.body.result).toBe("SUCCESS")
            })
        })

        test("[Positive] Delete player by id", async() => {
            // tiap habis test ini id ganti satu tingkat diatasnya. itu user udh kedelete.
            // const id ="17"
            // await request(app)
            // .delete(`/api/players/${id}`)
            // .expect(200)
            // .then((response) => {
            //     expect(response.body.result).toBe("SUCCESS")
            // })
        })

        // negative test
        test("[Negative] Create player with already exist username" , async () => {
            const username = "testfaris"
            const email = "testjest01@test.com"
            const password = "testjest01"
            const name = "testjest01"
            await request(app)
            .post("/api/players")
            .send({
                username:username,
                password:password,
                email:email,
                name:name
            })
            .expect(400)
            .then((response)=>{
                expect(response.body.result).toBe("FAILED")
            })
        },20000)

        test("[Negative] Create player with already exist email" , async () => {
            const username = "testjest01"
            const email = "testfaris@test.com"
            const password = "testjest01"
            const name = "testjest01"
            await request(app)
            .post("/api/players")
            .send({
                username:username,
                password:password,
                email:email,
                name:name
            })
            .expect(400)
            .then((response)=>{
                expect(response.body.result).toBe("FAILED")
            })
        },20000)

        test("[Negative] Create player with empty field" , async () => {
            await request(app)
            .post("/api/players")
            .send({username:"",password:"12341234"})
            .expect(400)
            .then((response)=>{
                expect(response.body.result).toBe("FAILED")
            })
        })

        test("[Negative] Login with empty username" , async () => {
            await request(app)
            .post("/api/login")
            .send({username:"",password:"12341234"})
            .expect(400)
            .then((response)=>{
                expect(response.body.result).toBe("FAILED")
            })
        })

        test("[Negative] Login with correct username but wrong password" , async () => {
            await request(app)
            .post("/api/login")
            .send({username:"testfaris",password:"ehehehe"})
            .expect(404)
            .then((response)=>{
                console.log(response.body)
            })
        })

        test("[Negative] Update user name with non-exist id", async() => {
            const id ="9999"
            await request(app)
            .put(`/api/players/${id}`)
            .send({username:"testadam"})
            .expect(400)
            .then((response) => {
                expect(response.body.result).toBe("FAILED")
            })
        })

        test("[Negative] Delete player with non-exist id", async() => {
            const id ="12"
            await request(app)
            .delete(`/api/players/${id}`)
            .expect(400)
            .then((response) => {
                expect(response.body.result).toBe("FAILED")
            })
        })
    })
    

})