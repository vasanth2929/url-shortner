// Import External Modules
const express = require("express");
const Url = require("./models/url");
const { nanoid } = require("nanoid");
const { connectDatabase } = require("./db");
let PORT = 9000;
// Initialize App
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
//set up view engine
app.set("view engine", "ejs");

app.get("/", (_, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  try {
    let { url, custom_short_url } = req.body;
    if (url) {
      let oldUrl = await Url.findOne({ originalUrl: url });
      if (oldUrl) {
        res.render("index", {
          shortUrl: req.headers.host + "/" + oldUrl.shortUrl,
        });
      } else {
        let short = custom_short_url ? custom_short_url : nanoid(5);
        let shortUrlExist = await Url.findOne({ shortUrl: short });
        if (shortUrlExist) {
          res.render("index", { error: "Short Name Already Exists." });
        } else {
          let savedUrl = new Url({
            originalUrl: url,
            shortUrl: short,
          });
          await savedUrl.save();
          res.render("index", {
            shortUrl: req.headers.host + "/" + savedUrl.shortUrl,
          });
        }
      }
    } else {
      res.render("index", { error: "" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/:shortId", async (req, res) => {
  let { shortId } = req.params;
  let url = await Url.findOne({ shortUrl: shortId });
  if (url) {
    res.redirect(url.originalUrl);
  } else {
    res.render("404");
  }
});

// server init
app.listen(process.env.PORT || PORT, async () => {
  await connectDatabase();
  console.log(`server listening on port ${PORT}`);
});
