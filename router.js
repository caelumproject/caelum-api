const fetch = require("node-fetch");

var supplyJSON = "https://ethplorer.io/service/service.php?data=0xc71a7ecd96fef6e34a5c296bee9533f1deb0e3c1&page=tab=tab-holders%26pageSize=100000";
var lockedAddress = "https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xc71a7ecd96fef6e34a5c296bee9533f1deb0e3c1&address=0xc71a7ecd96fef6e34a5c296bee9533f1deb0e3c1&tag=latest&apikey=WSXFQJCUUXQR6HY1PQB9KJQCQ3RIYPUVDQ"

var clmRouter = function (app) {

    app.get("/t1", async (req, res, next) => {
        let _locked_supply = await getLockedTokens();

        let _total_supply = await fetchAsync2();

        var balanceCounter = 0;

        for (var i = 0; i < _total_supply.holders.length; i++) {
          balanceCounter += _total_supply.holders[i].balance;
        }

        console.log(balanceCounter)

        var data = ({
            tokenDecimals: "8",
            totalSupplyGenerated: JSON.stringify(balanceCounter),
            circulatingSupply: JSON.stringify(Number(balanceCounter - _locked_supply.result)),
            lockedAsMasternode: _locked_supply.result
        })

        res.status(200).send(data);
    });

    app.get("/", function(req, res) {
        var welcomeText = "Welcome to 0xbtc API hub."
        return res.status(200).send(welcomeText);
    });

    app.get("/test", function(req, res) {
        console.log(getLockedTokens);
        return res.status(200).send(getLockedTokens);
    });

    async function getTotalSupply(json) {
        var balanceCounter = 0;

        for (var i = 0; i < json.holders.length; i++) {
          balanceCounter += json.holders[i].balance;
        }

        return balanceCounter
    }

    async function getLockedTokens () {
      let response = await fetch(lockedAddress);
      let data = await response.json();
      return data;
    }

    async function fetchAsync2 () {
      let response = await fetch(supplyJSON);
      let data = await response.json();
      return data;
    }
}


module.exports = clmRouter
