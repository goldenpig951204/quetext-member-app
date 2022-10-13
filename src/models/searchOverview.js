const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

const searchOverViewSchema = new Schema({
    username: String,
    userId: Number,
    site: String,
    proxyType: String,
    content: String,
    time: {
      type: Date,
      default: Date.now,
      required: true,
    }
});

searchOverViewSchema.statics.countRequests = async function(userId, username, site, proxyType) {
    const todayEnd = moment().endOf("d").utc();
    const todayStart = moment().startOf("d").utc();
    return await this.count({
        userId,
        username,
        site,
        proxyType,
        time: {
            $gte: todayStart,
            $lte: todayEnd,
        }
    });
}

const searchOverview = mongoose.model("searchoverview", searchOverViewSchema);

module.exports = searchOverview;