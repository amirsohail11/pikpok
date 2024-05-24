const cheerio = require('cheerio');
const getNextSequenceValue = async (sequenceName,Counter) => {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );

  return sequenceDocument.sequence_value;
};

const sanitize = (string) => {
  const $ = cheerio.load(string);
  return $.text();
};

module.exports = {getNextSequenceValue,sanitize} ;