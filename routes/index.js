var express = require("express");
var _ = require("lodash");
var router = express.Router();

var data = require("../data/mock_influencers.json");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/**
 * Obtém todos paises filtrados
 */
router.get("/stats/all", function (req, res, next) {
  const currentQuery = req.query.country;
  if (currentQuery !== undefined) {
    let filteredData = _(data)
      .groupBy((obj) => obj.country)
      .map((value, key) => ({
        country: key,
        count: value.length,
        blocked: _.filter(value, (item) => item.blocked).length,
      }))
      .value();
    res.json({
      countries: filteredData,
      total: data.length,
    });
  } else {
    res.json({
      message: "É obrigatorio você utilizar uma query!",
    });
  }
});

module.exports = router;
