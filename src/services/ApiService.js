import axios from 'axios'

const local = true
var springServer = 'https://ufc-rest-api-sb.us-east.mybluemix.net'
var flaskServer = 'https://ufc-ml-api-flask.us-east.mybluemix.net'

// 
// var springServer = null
// var flaskServer = null

if (local) {
    springServer = 'http://localhost:4646'
    flaskServer = 'http://207.237.93.29:4747'
}



const standardHeaders = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'X-IBM-Client-Id': '0b86eee1-9bb2-4b24-a69c-fa512f2fef36',
      'X-IBM-Client-Secret': '01827f5a-297c-415d-9e28-478b529b144a'
    }
}


export default {
    buildAdminHeaders(adminLogin) {
        var adminHeaders = {
            headers: {
                'Access-Control-Allow-Origin': standardHeaders['headers']['Access-Control-Allow-Origin'],
                'Content-Type': standardHeaders['headers']['Content-Type'],
                'X-IBM-Client-Id': standardHeaders['headers']['X-IBM-Client-Id'],
                'X-IBM-Client-Secret': standardHeaders['headers']['X-IBM-Client-Secret'],
                'password': adminLogin
            }   
        }
        return adminHeaders
    },
    getBoutsFromFight (fightId) {
        return axios.get( springServer + '/ufc/rest/fight/' + fightId + '/details', standardHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getBasicBoutsFromFight (fightId) {
        return axios.get( springServer + '/ufc/rest/fight/' + fightId + '/details/basic', standardHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getBetsFromFight (fightId) {
        return axios.get( springServer + '/ufc/bet/table/fight/' + fightId, standardHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getBoutBetsFromFight (fightId) {
        return axios.get( springServer + '/ufc/rest/fight/' + fightId + '/details/bet', standardHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getAllFightIds () {
        return axios.get( springServer + '/ufc/rest/fight/all', standardHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addFightOdds (fightId, adminLogin) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)
        return axios.get( springServer + '/ufc/parse/odds/fight/' + fightId + '/odds', adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getRecentFights () {
        return axios.get( springServer + '/ufc/rest/fight/recent', standardHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addMyBookieOdds (payload, adminLogin) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)
        console.log(adminHeaders)
        return axios.post( springServer + '/ufc/scores/odds/myBookie/add', payload, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getFighterEloStats (fighterOid, fightOid) {
        return axios.get( springServer + '/ufc/scores/elo/last/fighter/' + fighterOid + '/fight/' + fightOid, standardHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getFightersMissingAgeCount (adminLogin) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get( springServer + '/ufc/rest/admin/missing/fighter/age', adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getFightersMissingHeightCount (adminLogin) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get( springServer + '/ufc/rest/admin/missing/fighter/height', adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getFightersMissingReachCount (adminLogin) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get( springServer + '/ufc/rest/admin/missing/fighter/reach', adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getIncompleteBoutsCount (adminLogin) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get( springServer + '/ufc/rest/admin/missing/bouts', adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    resetFightData (adminLogin, fightOid) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get( springServer + '/ufc/rest/admin/reset/fight/'+fightOid, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addBoutsToPastFight (adminLogin, fightOid) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get( flaskServer + '/ufc/api/v1.0/populate/past/'+fightOid, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addBoutsToFutFight (adminLogin, fightOid) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get( flaskServer + '/ufc/api/v1.0/populate/future/'+fightOid, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getWeightClassRankings (weightClass) {
        return axios.get( flaskServer + '/ufc/api/v1.0/rankings/'+weightClass, standardHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addFightOddsUrl (adminLogin, fightId, url) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get( springServer + '/ufc/parse/odds/fight/'+fightId+ '/fightOdds/' + url, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addFutureBoutSummary (adminLogin, payload) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)
        
        return axios.post( springServer + '/ufc/rest/bout/future/summary/add', payload, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addMlProbToBout (adminLogin, boutId) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)
        return axios.get( flaskServer + '/ufc/api/v1.0/populate/ml/'+boutId, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addBetInfo (payload, adminLogin) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)
        
        return axios.post( springServer + '/ufc/bet/update', payload, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getBetInfo () {
        return axios.get( springServer + '/ufc/bet/history/v2', standardHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    }
}
