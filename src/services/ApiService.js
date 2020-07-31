import axios from 'axios'

const standardHeaders = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
}

export default {
    buildAdminHeaders(adminLogin) {
        var adminHeaders = {
            headers: {
                'Access-Control-Allow-Origin': standardHeaders['headers']['Access-Control-Allow-Origin'],
                'Content-Type': standardHeaders['headers']['Content-Type'],
                'password': adminLogin
            }   
        }
        return adminHeaders
    },
    getBoutsFromFight (fightId) {
        return axios.get('http://207.237.93.29:4646/ufc/rest/fight/' + fightId + '/details', standardHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getBoutBetsFromFight (fightId) {
        return axios.get('http://207.237.93.29:4646/ufc/rest/fight/' + fightId + '/details/bet', standardHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getAllFightIds () {
        return axios.get(`http://207.237.93.29:4646/ufc/rest/fight/all`, standardHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addFightOdds (fightId, adminLogin) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)
        return axios.get('http://207.237.93.29:4646/ufc/parse/odds/fight/' + fightId + '/odds', adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getRecentFights () {
        return axios.get('http://207.237.93.29:4646/ufc/rest/fight/recent', standardHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addMyBookieOdds (payload, adminLogin) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)
        
        return axios.post('http://207.237.93.29:4646/ufc/scores/odds/myBookie/add', payload, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getFighterEloStats (fighterOid, fightOid) {
        return axios.get('http://207.237.93.29:4646/ufc/scores/elo/last/fighter/' + fighterOid + '/fight/' + fightOid, standardHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getFightersMissingAgeCount (adminLogin) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get('http://207.237.93.29:4646/ufc/rest/admin/missing/fighter/age', adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getFightersMissingHeightCount (adminLogin) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get('http://207.237.93.29:4646/ufc/rest/admin/missing/fighter/height', adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getFightersMissingReachCount (adminLogin) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get('http://207.237.93.29:4646/ufc/rest/admin/missing/fighter/reach', adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getIncompleteBoutsCount (adminLogin) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get('http://207.237.93.29:4646/ufc/rest/admin/missing/bouts', adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    resetFightData (adminLogin, fightOid) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get('http://207.237.93.29:4646/ufc/rest/admin/reset/fight/'+fightOid, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addBoutsToPastFight (adminLogin, fightOid) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get('http://localhost:4747/ufc/api/v1.0/populate/past/'+fightOid, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addBoutsToFutFight (adminLogin, fightOid) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get('http://localhost:4747/ufc/api/v1.0/populate/future/'+fightOid, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    getWeightClassRankings (weightClass) {
        return axios.get('http://localhost:4747/ufc/api/v1.0/rankings/'+weightClass, standardHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addFightOddsUrl (adminLogin, fightId, url) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)

        return axios.get('http://207.237.93.29:4646/ufc/parse/odds/fight/'+fightId+ '/fightOdds/' + url, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addFutureBoutSummary (adminLogin, payload) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)
        
        return axios.post('http://207.237.93.29:4646/ufc/rest/bout/future/summary/add', payload, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
    addMlProbToBout (adminLogin, boutId) {
        var adminHeaders = this.buildAdminHeaders(adminLogin)
        return axios.get('http://localhost:4747/ufc/api/v1.0/populate/ml/'+boutId, adminHeaders).then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error)
        })
    },
}
