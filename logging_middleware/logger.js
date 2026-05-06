function Log(
  stack,
  level,
  packageName,
  message
) {

  const log = {

    timestamp:
      new Date().toISOString(),

    stack,

    level,

    package:
      packageName,

    message
  };

  console.log(log);
}

module.exports = Log;