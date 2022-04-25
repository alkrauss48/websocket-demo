/**
 * The total number of requests we should let through, within the PER time.
 *
 * @const number
 */
const RATE = 15;

/**
 * The limit at which the RATE applies.
 *
 * @const number
 */
const PER = 8;

/**
 * The last time that a request came in.
 *
 * @let number
 */
let lastCheck = new Date();

/**
 * The number of remaining requests.
 *
 * @let number
 */
let allowance = RATE;

/**
 * Handle rate limiting the incoming request
 *
 * @return boolean - Whether the request should successfully continue.
 */
const handleRateLimit = () => {
  const current = new Date();
  const timePassed = Math.floor((current - lastCheck) / 1000);

  // Set the last check to the current time
  lastCheck = current;

  allowance += timePassed * (RATE / PER);

  // If the allowance is greater than the RATE, then set it to the RATE.
  // This should be the normal situation, unless a flood of requests come in.
  if (allowance > RATE){
    allowance = RATE;
  }

  // If there are no more allowed requests, then return false.
  if (allowance <= 0){
    return false
  }

  // Otherwise, decrement the allowed requests and return true.
  allowance--

  return true;
}

module.exports = {
  handleRateLimit,
};
