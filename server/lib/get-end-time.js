const getEndTime = meta => {
  return meta.customEndTime || meta.duration;
};
module.exports = getEndTime;
