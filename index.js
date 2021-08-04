const express = require('express')
const qs = require('qs')
const app = express()
const axios = require('axios').default
const axios2 = require('axios')

app.get('/', (req, res) => {
    res.send('<a href="https://nauth.namutree0345.xyz/?client_id=894439">Login</a><br/><form action="/act" method="GET" enctype="urlencoded"><input type="text" name="code" placeholder="code"/></form>')
})

app.get('/act', (req, res) => {
    if(req.query.code) {
        console.log('0')
        axios.post('https://nauth.namutree0345.xyz/token', qs.stringify({
            client_id: '894439',
            client_secret: 'GEXCDhSnw8D7q3rBONOpx31iAcjDweD8hCssg5ppYY6Lma1l0NOjBtpvPrgr',
            code: req.query.code
        }), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).then((val) => {
            console.log('1')
            const token = val.data.token
            axios.get('https://nauth.namutree0345.xyz/authenticate?client_id=894439&client_secret=GEXCDhSnw8D7q3rBONOpx31iAcjDweD8hCssg5ppYY6Lma1l0NOjBtpvPrgr', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then((val2) => {
                res.json(val2.data)
            }).catch((reason) => {
                if(reason.response) {
                    res.json(reason.response.data)
                }
            })
        }).catch((reason) => {
            if(reason.response) {
                res.json(reason.response.data)
            }
        })
    }
})

app.listen(8090)