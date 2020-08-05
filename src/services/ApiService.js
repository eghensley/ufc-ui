import axios from 'axios'

// const local = false
// var springServer = null
// var flaskServer = null

// if (local) {
//     springServer = 'localhost'
//     flaskServer = 'localhost'
// } else {
//     springServer = '207.237.93.29:4646'
//     flaskServer = '207.237.93.29:4747'
// }

const springServer = 'ufc-rest-api-sb.mybluemix.net'
const flaskServer = '207.237.93.29:4747'

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
        return axios.get('https://' + springServer + '/ufc/rest/fight/' + fightId + '/details', standardHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getBoutBetsFromFight (fightId) {
        return axios.get('https://' + springServer + '/ufc/rest/fight/' + fightId + '/details/bet', standardHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getAllFightIds () {
        return axios.get('https://' + springServer + '/ufc/rest/fight/all', standardHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addFightOdds (fightId, adminLogin) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)
        return axios.get('https://' + springServer + '/ufc/parse/odds/fight/' + fightId + '/odds', adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getRecentFights () {
        return axios.get('https://' + springServer + '/ufc/rest/fight/recent', standardHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addMyBookieOdds (payload, adminLogin) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)
        console.log(adminHeaders)
        return axios.post('https://' + springServer + '/ufc/scores/odds/myBookie/add', payload, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getFighterEloStats (fighterOid, fightOid) {
        return axios.get('https://' + springServer + '/ufc/scores/elo/last/fighter/' + fighterOid + '/fight/' + fightOid, standardHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getFightersMissingAgeCount (adminLogin) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get('https://' + springServer + '/ufc/rest/admin/missing/fighter/age', adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getFightersMissingHeightCount (adminLogin) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get('https://' + springServer + '/ufc/rest/admin/missing/fighter/height', adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getFightersMissingReachCount (adminLogin) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get('https://' + springServer + '/ufc/rest/admin/missing/fighter/reach', adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getIncompleteBoutsCount (adminLogin) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get('https://' + springServer + '/ufc/rest/admin/missing/bouts', adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    resetFightData (adminLogin, fightOid) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get('https://' + springServer + '/ufc/rest/admin/reset/fight/'+fightOid, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addBoutsToPastFight (adminLogin, fightOid) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get('https://' + flaskServer + '/ufc/api/v1.0/populate/past/'+fightOid, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addBoutsToFutFight (adminLogin, fightOid) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get('https://' + flaskServer + '/ufc/api/v1.0/populate/future/'+fightOid, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getWeightClassRankings (weightClass) {
        return axios.get('https://' + flaskServer + '/ufc/api/v1.0/rankings/'+weightClass, standardHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addFightOddsUrl (adminLogin, fightId, url) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get('https://' + springServer + '/ufc/parse/odds/fight/'+fightId+ '/fightOdds/' + url, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addFutureBoutSummary (adminLogin, payload) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)
        
        return axios.post('https://' + springServer + '/ufc/rest/bout/future/summary/add', payload, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addMlProbToBout (adminLogin, boutId) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)
        return axios.get('https://' + flaskServer + '/ufc/api/v1.0/populate/ml/'+boutId, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addBetInfo (payload, adminLogin) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)
        
        return axios.post('https://' + springServer + '/ufc/bet/update', payload, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getBetInfo () {
        return axios.get('https://' + springServer + '/ufc/bet/history', standardHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    }
}
